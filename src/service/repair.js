import api from '../utils/request';

export function getList(params,callback) {//获取列表
  return api('captcha', {
    params: JSON.stringify(params)
  },callback);
}
export function getDetail(params,callback) {//获取详情
  return api('app/workbench/getDetail', {
    params: params
  },callback);
}
export function updateWorkorderStatus(params,callback) {//拍照处理
  return api('app/workbench/updateWorkorderStatus', {
    params: JSON.stringify(params)
  },callback);
}
export function applyChangeAssign(params,callback) {//申请改派
  return api('app/workbench/applyChangeAssign', {
    params: JSON.stringify(params)
  },callback);
}
export function refuseApplyChange(params,callback) {//拒绝改派
  return api('app/workbench/refuseApplyChange', {
    params: JSON.stringify(params)
  },callback);
}
export function getAssignPeronInfo(params,callback) {//获取派单备选人员信息
  return api('app/workbench/getAssignPeronInfo', {
    params: params
  },callback);
}
export function WorkOrderAssign(params,callback) {//派单/改派
  return api('app/workbench/WorkOrderAssign', {
    params: JSON.stringify(params)
  },callback);
}
export function applyWorkOrderCancel(params,callback) {//申请取消
  return api('app/workbench/applyWorkOrderCancel', {
    params: JSON.stringify(params)
  },callback);
}
export function applyHang(params,callback) {//申请挂起
  return api('app/workbench/applyHang', {
    params: JSON.stringify(params)
  },callback);
}
export function workOrderRestart(params,callback) {//重新开始
  return api('app/workbench/workOrderRestart', {
    params: JSON.stringify(params)
  },callback);
}
export function applyCoordination(params,callback) {//申请协同人员
  return api('app/workbench/applyCoordination', {
    params: JSON.stringify(params)
  },callback);
}
export function refuseApplyCoordination(params,callback) {//拒绝协同人员
  return api('app/workbench/refuseApplyCoordination', {
    params: JSON.stringify(params)
  },callback);
}
export function getAssignCoordinationPeronInfo(params,callback) {//获取协同人员数据(排除维修人员)
  return api('app/workbench/getAssignCoordinationPeronInfo', {
    params: params
  },callback);
}
export function WorkOrderAssignCoordination(params,callback) {//设置协同人员
  return api('app/workbench/WorkOrderAssignCoordination', {
    params: JSON.stringify(params)
  },callback);
}
export function WorkorderFinish(params,callback) {//工单完成
  return api('app/workbench/WorkorderFinish', {
    params: JSON.stringify(params)
  },callback);
}
export function getCustomerConfirmationInfo(params,callback) {//获取完成信息
  return api('app/workbench/getCustomerConfirmationInfo', {
    params: params
  },callback);
}
export function WorkorderCustomerConfirmation(params,callback) {//客户确认
  return api('app/workbench/WorkorderCustomerConfirmation', {
    params: JSON.stringify(params)
  },callback);
}
