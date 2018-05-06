import api from '../utils/request';

export function getUserGps(params,callback) {
  return api('app/user/getUserGps', {
    params: params
  },callback);
}
