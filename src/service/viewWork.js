import api from '../utils/request';

export function getProjectUser(params,callback) {
  return api('app/workbench/getProjectUser', {
    params: params
  },callback);
}
export function getChargeProject(params,callback) {
  return api('app/workbench/getChargeProject', {
    params: params
  },callback);
}
export function getSelectTime(params,callback) {
  return api('app/workbench/getSelectTime', {
    params: params
  },callback);
}
