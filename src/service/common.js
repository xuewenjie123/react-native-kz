import api from '../utils/request';

export function getDicValue(params,callback) {
  return api('com/getDicValue', {
    params: params
  },callback);
}
