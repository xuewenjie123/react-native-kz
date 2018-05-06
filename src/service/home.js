import api from '../utils/request';
import apiText from '../utils/requestText';

export function getImportantItem(params,callback) {
  return api('app/workbench/getImportantItem', {
    params: JSON.stringify(params)
  },callback);
}
export function getNeedToDo(params,callback) {
  return api('app/workbench/getNeedToDo', {
    params: JSON.stringify(params)
  },callback);
}
export function getAdInfo(params,callback) {
  return api('app/workbench/getAdInfo', {
    params: params
  },callback);
}
export function getMenu(params,callback) {
  return apiText('captcha', {
    params: JSON.stringify(params)
  },callback);
}
