import api from '../utils/request';

export function online(params,callback) {
  return api('captcha', {
    params: JSON.stringify(params)
  },callback);
}
export function outline(params,callback) {
  return api('captcha', {
    params: JSON.stringify(params)
  },callback);
}
