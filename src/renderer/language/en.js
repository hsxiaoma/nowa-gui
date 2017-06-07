module.exports = {
  'welcome.import': 'Import Project',
  'welcome.create': 'Create New Project',
  'welcome.description': 'Drag your project folder here to import.',
  'welcome.notice': 'Only support NOWA project!',

  'project.list.title': 'Projects',
  'project.list.empty': 'Drag NOWA project folder here',
  'project.list.add': 'New NOWA Project',
  'project.list.import': 'Import Project',
  'project.meta.port': 'Port',
  'project.meta.path': 'Path',
  'project.meta.name': 'Name',
  'project.meta.description': 'Description',
  'project.meta.author': 'Author Name',
  'project.meta.version': 'Version',
  'project.meta.homepage': 'Homepage',
  'project.meta.repo': 'Repository',
  'project.meta.npm_registry': 'Npm Registry',
  'project.meta.others': 'Others',

  'task.start': 'Start',
  'task.stop': 'Stop',
  'task.compile': 'Compile',
  'task.compass': 'Explore',
  'task.editor': 'Editor',
  'task.terminal': 'Terminal',
  // 'task.clear': 'Clear',
  'task.remove': 'Remove Project',
  'task.folder': process.platform === 'darwin'
    ? 'Reveal in Finder'
    : 'Reveal in Folder',
  'task.status.start': 'Running',
  'task.status.stop': 'Stopped',

  'project.tab.setting': 'Setting',
  'project.tab.basic': 'Basic Config',
  'project.tab.server': 'Server Config',
  'project.tab.build': 'Build Config',
  'project.tab.console': 'Console',
  'project.tab.package': 'Package',
  'project.tab.listen_log': 'Listener log',
  'project.tab.compile_log': 'Compiler log',
  'project.tab.dependencies': 'Dependencies',
  'project.tab.devDependencies': 'Dev Dependencies',
  // 'project.tab.command_log': 'Command List',

  'project.new.title': 'Create New Project',
  'project.new.version': 'Version',
  'project.new.create': 'Create',
  'project.new.edit': 'Edit',
  'project.new.update': 'Update',
  'project.new.more': 'Learn More',
  'project.new.retry': 'Retry Download',
  'project.new.step1': 'Select Template',
  'project.new.step2': 'Configuration',
  'project.new.step3': 'Installing Dependencies',
  'project.new.log.wait': 'Waiting for package installation',
  'project.new.log.error': 'Install failed, please check the log below',
  'project.new.log.retry': 'Retry',
  'project.new.empty': 'No templates.',
  'project.new.addTempldate': 'Add Custom Template',
  'project.new.networkTip':
    'Internet connection is required during creating a project, please check your network',

  'project.import.title': 'Initializing for Project Import',
  'project.import.info':
    'Some dependencies of this project are uninstalled, please choose an appropriate NPM registry to install from.',
  'project.import.install': 'Installing Dependencies',

  'template.modal.title': 'Custom Template Setting',
  'template.modal.local.title': 'Local Template',
  'template.modal.remote.title': 'Remote Template',
  'template.modal.local.path': 'Local Path',
  'template.modal.remote.path': 'Remote Path',
  'template.modal.name': 'Name',
  'template.modal.description': 'Description',

  'template.setting.modal.title': 'Override these files?',

  'form.submit': 'Submit',
  'form.reset': 'Reset',
  'form.back': 'Back',
  'form.retry': 'Retry',
  'form.ok': 'OK',
  'form.cancel': 'Cancel',
  'form.delete': 'Delete',
  'form.override': 'Override',
  'form.import': 'Import',
  'form.add': 'Add',

  // 'setting.modal.title': 'Setting',
  'setting.basic.title': 'Basic Setting',
  'setting.language': 'Language',
  'setting.language.en': 'English',
  'setting.language.zh': '中文',
  'setting.version': 'Version',
  'setting.editor': 'Editor',
  'setting.registry': 'Registry',
  'setting.version.newest.tip': 'Newest',

  'setting.cmd.title': 'Command Setting',

  'setting.plugin.title': 'Plugins Setting',
  'setting.plugin.apply': 'Apply',
  'setting.plugin.name': 'Plugin Name',
  'setting.plugin.version': 'Plugin Version',
  'setting.plugin.newest': 'Plugin Newest',
  'setting.plugin.action': 'Action',
  'setting.plugin.download': 'Download',
  'setting.plugin.update': 'Update',
  'setting.plugin.update.tip': 'Are you sure to update this plugin?',

  'foot.set': 'Setting',
  // 'foot.import': 'Import Project',
  'foot.add': 'New Project',
  'foot.feedback': 'Feedback',
  'foot.help': 'Help',
  'foot.issue': 'Issue',

  'msg.installSuccess': 'Installed Successfully!',
  'msg.installFail': 'Installed Failed!',
  'msg.invalidPort': 'Invalid Port!',
  'msg.invalidProject': 'Invalied Project!',
  'msg.invalidVersion': 'Invalied Version!',
  'msg.invalidName': 'Invalied Name!',
  'msg.invalidUrl': 'Invalied Url!',
  'msg.invalidRegistry': 'Invalied Registry!',
  'msg.invalidTemplate': 'Invalied Template Folder!',
  'msg.existed': 'Already existed!',
  'msg.nameRequired': 'Name Required!',
  'msg.contactRequired': 'Contact Required!',
  'msg.contentRequired': 'Content Required!',
  'msg.importSuccess': 'Import Successfully!',
  'msg.importFailed': 'Import Failed!',
  'msg.updateSuccess': 'Update Successfully!',
  'msg.updateFailed': 'Update Failed!',
  'msg.removeTip': 'Are you sure to remove this item?',
  'msg.templateErr': 'Template Files are downloading. Please try again later.',
  'msg.nowaVersionTip':
    'Your globally installed nowa-cli is outdated. For a better experience, please exec `npm uninstall nowa -g`',
  'msg.LinkInvalidation': 'Link Invalidation',
  'msg.required': 'Required',

  'msg.editorPath': 'Please set installation path of default editor!',
  'msg.editorNotExisted': 'Please go to the config pane to set EDITOR path.',

  'msg.updateConfirm': 'Want to upgrade to a new release?',
  'msg.curVersion': 'Current Version',
  'msg.nextVersion': 'Next Version',
  'msg.updateTip': 'Update Announcement',
  'msg.updateCnt1': 'There is a new version({1}), the current version is {2}',
  'msg.updateCnt2': 'Download',
  'msg.updateTitle': 'Update Tip',

  'cmd.sider.title': 'Command List',
  'cmd.modal.title': 'Add a command',
  'cmd.select.opt': 'Command List',
  'cmd.meta.name': 'Command Name',
  'cmd.meta.value': 'Command Content',
  'cmd.meta.apply': 'Enabled',
  'cmd.meta.action': 'Action',
  'cmd.stop.tip':
    'Please wait until this command is finished, then try it again.',
  'cmd.global.title': 'Global Commands Setting',
  'cmd.global.tip': 'Settings down here will be applied to every project',

  'preinit.msg1':
    'Internet connection is required during initialization, check your network & reopen APP.',
  'preinit.msg2': 'Shutdown in {1} seconds',
  'preinit.waitInstall':
    'Installing NOWA dependencies, please wait for about half a minute.',

  'package.name': 'Name',
  'package.current': 'Current',
  'package.installed': 'Installed',
  'package.newest': 'Newest',
  'package.action': 'Action',
  'package.btn.updateAll': 'Batch Update',
  'package.btn.install': 'Add New Dependency',
  'package.update.tip': 'Are you sure to update this package?',

  'table.empty': 'No data.',
  'table.action.del': 'delete',
  'table.action.update': 'update',

  'feedback.modal.title': 'Feedback',
  'feedback.name': "What's your name?",
  'feedback.contact': 'How to contact with you?',
  'feedback.content': "What's your problem?",
  'feedback.success': ' Send Successfully!',
};
