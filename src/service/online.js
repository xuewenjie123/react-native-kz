import api from '../utils/request';
import apiText from '../utils/requestText';

export function getMaintInfo(params,callback) {
  return api('app/workbench/getMaintInfo', {
    params: params
  },callback);
}
export function WorkOrderRob(params,callback) {
  return api('app/workbench/WorkOrderRob', {
    params: JSON.stringify(params)
  },callback);
}
