const { fork, spawn, exec } = require('child_process');
const { join, resolve } = require('path');
const fs = require('fs-extra');
const uuid = require('uuid');
const { tmpdir } = require('os');
const npmRunPath = require('npm-run-path');
const Sudoer = require('electron-sudo');


const task = require('../task');
const kill = require('./kill');
const modules = require('./modules');
const env = require('./env');
const { getWin } = require('../windowManager');
const { constants: { NPM_PATH, APP_PATH, NOWA_INSTALL_DIR, NODE_PATH }, isWin, isMac, isLinux } = require('../is');

const exportFunc = {

  openEditor(projectPath, editor, basePath) {
    let editorPath = basePath;

    if (editor === 'Sublime') {
      // editorPath = join(basePath, isWin ? 'subl.exe' : '/Contents/SharedSupport/bin/subl');
      // editorPath = join(basePath, isWin ? 'sublime_text.exe' : '/Contents/SharedSupport/bin/subl');

      if (isMac) {
        editorPath = join(basePath, '/Contents/SharedSupport/bin/subl');
      }

      if (isWin) {
        editorPath = basePath.indexOf('.exe') === -1 
          ? join(basePath, 'sublime_text.exe') : basePath;
      }
    }

    if (editor === 'VScode') {
      // editorPath = join(basePath, isWin ? 'bin/code.cmd' : '/Contents/Resources/app/bin/code');
      // editorPath = join(basePath, isWin ? 'Code.exe' : '/Contents/Resources/app/bin/code');

      if (isMac) {
        editorPath = join(basePath, '/Contents/Resources/app/bin/code');
      }

      if (isWin) {
        editorPath = basePath.indexOf('.exe') === -1 ? join(basePath, 'Code.exe') : basePath;
      }
    }

    if (editor === 'WebStorm') {
      if (isMac) {
        editorPath = join(basePath, '/Contents/MacOS/webstorm');
      }
    }

    let term;

    return new Promise((resolve, reject) => {
      try {
        if (editor === 'WebStorm') {
          /*execSync(`${editorPath} ${projectPath}`,
            {
              cwd: projectPath,
            });*/

          term = exec(`${editorPath} ${projectPath}`, { cwd: projectPath });
        } else {
          term = spawn(editorPath, ['./'], { cwd: projectPath });
        }
        term.on('exit', () => {
          console.log('exit ediotr');
          resolve({ success: true });
        });
        // return true;
      } catch (e) {
        resolve({ success: false });
        // return false;
      }
    });
  },

  openTerminal(cwd) {
    if (isWin) {
      const shell = process.env.comspec || 'cmd.exe';
      exec(`start ${shell}`, { cwd });
    } else if (isMac) {
      exec(join(APP_PATH, 'task', 'terminal'), { cwd });
    } else {
      exec('/usr/bin/x-terminal-emulator', { cwd });
    }
  },

  linkNowa() {
    try {
      if (isWin) {
        const nodePath = join(NODE_PATH, 'node.exe');
        const srcNowa = join(NOWA_INSTALL_DIR, 'node_modules', 'nowa', 'bin', 'nowa');

        const target = join(npmRunPath.env().APPDATA, 'npm', 'nowa.cmd');

        if (fs.existsSync(target)) {
          fs.removeSync(target);
        }

        const str =
        ` @ECHO OFF
          @SETLOCAL
          @SET PATHEXT=%PATHEXT:;.JS;=;%
          "${nodePath}" "${srcNowa}" %*`

        fs.writeFileSync(target, str, { mode: 0o775 });
      } else {
        const nodePath = join(NODE_PATH, 'node');
        const linkFile = join(APP_PATH, 'task', 'link.js');
        const opt = {
          name: 'NowaGUI',
        };

        const sudoer = new Sudoer(opt);

        sudoer.spawn(nodePath, [linkFile], { env })
          .then(function (cp) {
          })
        /*const target = '/usr/local/bin/nowa';
        const srcNowa = join(NOWA_INSTALL_DIR, 'node_modules', '.bin', 'nowa');
        if (fs.existsSync(target)) {
          fs.removeSync(target);
        }
        fs.symlinkSync(srcNowa, target);*/
      }
    } catch (e) {
      
    }

    // exec('npm link', { cwd: join(NOWA_INSTALL_DIR, 'node_modules', 'nowa'), env });
  },

  exec({ name, type }) {
    const win = getWin();
    const uid = uuid.v4();
    console.log('exec', type, name);
    const term = fork(NPM_PATH, ['run', type, '--scripts-prepend-node-path=auto'], {
      silent: true,
      cwd: name,
      env: Object.assign(env, { NOWA_UID: uid }),
      // detached: true
    });

    task.setTask(type, name, {
      term,
      uid
    });

    const senderData = (data) => {
      const log = task.writeLog(type, name, data);
      win.webContents.send('task-ouput', {
        name,
        log,
        type,
      });
    };

    term.stdout.on('data', senderData);
    term.stderr.on('data', senderData);

    term.on('exit', (code) => {
      task.clearTerm(type, name);
      console.log('exit', type, code);
      if (getWin()) {
        getWin().webContents.send('task-end', {
          name,
          type,
          finished: code === 0
        });
      }
    });
  },

  stop({ name, type }) {
    const t = task.getTask(type, name);
    if (t.term) {
      kill(t.term.pid, 'SIGKILL');
      if (type === 'start') {
        const uidPath = join(tmpdir(), `.nowa-server-${t.uid}.json`);
        fs.removeSync(uidPath);
      }
    }
  },

  clearLog({ name, type }) {
    task.clearLog(type, name);
  },

  clearNotMacTask(cb) {
    console.log('clear task');
    const taskStart = task.getCmd('start');
    let a = 0, b = 0;
    Object.keys(taskStart).forEach((item) => {
      if (taskStart[item].term) {
        a++;
        // console.log(item, taskStart[item].term.pid, a, b);
        kill(taskStart[item].term.pid, 'SIGKILL', () => {
          b++;
          if (a ===b) cb();
        });
      }
    });
    if (a === 0) cb();
  },

  clearMacTask() {
    console.log('clear task');
    const taskStart = task.getCmd('start');
    Object.keys(taskStart).forEach((item) => {
      if (taskStart[item].term) {
        taskStart[item].term.kill();
      }
    });
  }

};

module.exports = Object.assign(modules, exportFunc);

