import api from '../utils/request';

export function getCompleteList(params,callback) {
  return api('captcha', {
    params: params
  },callback);
}
export function getCompleteDatile(params,callback) {
  return api('captcha', {
    params: params
  },callback);
}
export function getSugesstionList(params,callback) {
  return api('captcha', {
    params: params
  },callback);
}
export function getSugesstionDatile(params,callback) {
  return api('captcha', {
    params: params
  },callback);
}
