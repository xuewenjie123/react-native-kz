import api from '../utils/request';
import apiText from '../utils/requestText';

export function getAreaList(params,callback) {
  return api('app/my/chargeArea', {
    params: JSON.stringify(params)
  },callback);
}
export function getNewset(params,callback) {
  return api('captcha', {
    params: params
  },callback);
}
export function employeeInfo(params,callback) {
  return api('app/user/employeeInfo', {
    params: params
  },callback);
}
export function editUserInfo(params,callback) {
  return api('app/user/editUserInfo', {
    params: JSON.stringify(params)
  },callback);
}
export function saveFile(params,callback) {
  return api('app/user/saveFile', {
    params: JSON.stringify(params)
  },callback);
}
