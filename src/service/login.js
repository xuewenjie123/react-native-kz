import api from '../utils/request';
import apiText from '../utils/requestText';

export function login(params,callback) {
  return api('app/user/login', {
    params: JSON.stringify(params)
  },callback);
}
export function editpassword(params,callback) {
  return api('app/user/editpassword', {
    params: JSON.stringify(params)
  },callback);
}
