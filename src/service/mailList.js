import api from '../utils/request';

export function getList(params,callback) {
  return api('app/my/getMyAddressBook', {
    params: JSON.stringify(params)
  },callback);
}
