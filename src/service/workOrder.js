import api from '../utils/request';

export function getNoAssignWorkOrder(params,callback) {
  return api('app/workbench/getNoAssignWorkOrder', {
    params: JSON.stringify(params)
  },callback);
}
export function getMaintenanceWorkOrder(params,callback) {//获取列表
  return api('app/workbench/getMaintenanceWorkOrder', {
    params: JSON.stringify(params)
  },callback);
}
export function getFinishWorkOrder(params,callback) {//获取列表
  return api('app/workbench/getFinishWorkOrder', {
    params: JSON.stringify(params)
  },callback);
}
