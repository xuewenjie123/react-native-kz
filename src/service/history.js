import api from '../utils/request';

export function getHisWorkOrder(params,callback) {//历史工单
  return api('app/workbench/getHisWorkOrder', {
    params: JSON.stringify(params)
  },callback);
}
