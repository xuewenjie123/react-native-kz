import api from '../utils/request';

export function getList(params,callback) {
  return api('captcha', {
    params: params
  },callback);
}
export function getDatile(params,callback) {
  return api('captcha', {
    params: params
  },callback);
}
