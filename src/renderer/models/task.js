import { remote } from 'electron';
import Message from 'antd/lib/message';
import i18n from 'i18n';

import { delay } from '../util';
const { command } = remote.getGlobal('services');

export default {

  namespace: 'task',

  state: {
    start: {},
    build: {}
  },

  subscriptions: {
    setup({ dispatch }) {

      window.onbeforeunload = (e) => {
        dispatch({
          type: 'dispose'
        });

        dispatch({
          type: 'project/saveCurrent'
        });
      };
    },
  },

  effects: {
    * start({ payload: { project } }, { put, select }) {
      const { start } = yield select(state => state.task);

      const { projects } = yield select(state => state.project);

      const term = command.start(project.path);

      console.log('start', term.pid);

      start[project.path] = term;

      projects.map((item) => {
        if (item.path === project.path) item.start = true;

        return item;
      });

      yield put({
        type: 'changeStatus',
        payload: {
          start
        }
      });

      yield put({
        type: 'project/changeStatus',
        payload: {
          projects,
          current: {
            ...project,
            start: true
          }
        }
      });

      yield put({
        type: 'layout/changeStatus',
        payload: {
          activeTab: '1'
        }
      });
    },
    * build({ payload: { project } }, { put, select }) {
      const { build } = yield select(state => state.task);

      const term = command.build(project.path);

      console.log('build', term.pid);

      // build[project.path] = { term };
      build[project.path] = term;

      yield put({
        type: 'layout/changeStatus',
        payload: {
          activeTab: '2'
        }
      });
      yield put({
        type: 'changeStatus',
        payload: {
          build
        }
      });
    },
    * stop({ payload: { project } }, { put, select }) {
      const { projects } = yield select(state => state.project);

      const { start } = yield select(state => state.task);

      start[project.path].kill();

      projects.map((item) => {
        if (item.path === project.path) item.start = false;

        return item;
      });

      yield put({
        type: 'project/changeStatus',
        payload: {
          projects,
          current: {
            ...project,
            start: false
          }
        }
      });
    },
    * exit({ payload: { type, name } }, { put, select }) {
      const { build, start } = yield select(state => state.task);
      const { projects } = yield select(state => state.project);

      if (type === 'start') {
        // start[name].term.kill();
        delete start[name];
      }

      if (type === 'build') {
        delete build[name];
        /*const pj = projects.filter(item => item.path === name)[0];
        if (pj.taskErr) {
          Message.error(`${pj.name} Build Failed!`);
        } else {
          Message.success(`${pj.name} Build Finished!`);
        }*/
      }
      console.log('exit', type);

      yield put({
        type: 'changeStatus',
        payload: {
          start,
          build
        }
      });
    },
    * clearLog({ payload: { name, type } }, { put, select }) {
      const { build, start } = yield select(state => state.task);

      if (type === 'build') {
        build[name].kill();
        delete build[name];

        yield put({
          type: 'changeStatus',
          payload: {
            build: { ...build }
          }
        });
      }

      if (type === 'start') {

        yield put({
          type: 'changeStatus',
          payload: {
            start: { ...start }
          }
        });
      }
    },
    * dispose(o, { select }) {
      const { start, build } = yield select(state => state.task);
      Object.keys(start).map((item) => {
        start[item].kill();
      });
      Object.keys(build).map((item) => {
        build[item].kill();
      });
    },
    * openEditor({ payload: { project } }, { put, select}) {
      // command.openSublime(project.path);
      const { defaultEditor, editor } = yield select(state => state.layout);
      console.log(defaultEditor)
      const editorPath = editor[defaultEditor];

      if (!editorPath) {
        Message.error(i18n('msg.editorNotExisted'));

        yield delay(1000);

        yield put({
          type: 'layout/changeStatus',
          payload: { showSetModal: true }
        });
      } else {
        command.openEditor(project.path, defaultEditor, editorPath);
      }
    }
  },

  reducers: {
    changeStatus(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
