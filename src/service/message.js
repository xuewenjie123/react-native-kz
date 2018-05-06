import api from '../utils/request';
import apiText from '../utils/requestText';

export function getAppInfoPushRecord(params,callback) {
  return api('app/workbench/getAppInfoPushRecord', {
    params: JSON.stringify(params)
  },callback);
}
export function getActivityInformation(params,callback) {
  return api('app/workbench/getActivityInformation', {
    params: JSON.stringify(params)
  },callback);
}
export function getNoticeDatile(params,callback) {
  return apiText('captcha', {
    params: JSON.stringify(params)
  },callback);
}
