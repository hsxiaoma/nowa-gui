import fs from 'fs-extra';
import { LOCAL_PROJECTS, LANGUAGE, EDITOR, SUBMIT_PATH, VSCODE_PATH } from '../constants';

const storage = window.localStorage;

export const getStoreProjects = () => JSON.parse(storage.getItem(LOCAL_PROJECTS)) || [];

export const setLocalProjects = (projects) => {
  storage.setItem(LOCAL_PROJECTS, JSON.stringify(projects));
};

export const getLocalProjects = () => {
  const projects = getStoreProjects();
  // 检查项目是否存在
  const filter = projects.filter(project => fs.existsSync(project.path));

  setLocalProjects(filter);

  return filter;
};

export const getLocalTemplateUpdate = type => storage.getItem(type);

export const setLocalTemplateUpdate = (type, date) => storage.setItem(type, date);

export const getLocalLanguage = () => storage.getItem(LANGUAGE);

export const setLocalLanguage = language => storage.setItem(LANGUAGE, language);

export const getLocalEditor = () => storage.getItem(EDITOR);

export const setLocalEditor = editor => storage.setItem(EDITOR, editor);

export const getLocalSublimePath = () => storage.getItem(SUBMIT_PATH);

export const setLocalSublimePath = sublimePath => storage.setItem(SUBMIT_PATH, sublimePath);

export const getLocalVScodePath = () => storage.getItem(VSCODE_PATH);

export const setLocalVScodePath = vscodePath => storage.setItem(VSCODE_PATH, vscodePath);
