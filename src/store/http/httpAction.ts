import { notification } from 'antd';
import * as _ from 'lodash';
import { SUCCESS_HTTP_CODE, UNAUTHENTICATION  } from 'src/config/app.config';
import allInfos from 'src/i18n/global/info';
import http from 'src/util/http';
import { getStore } from 'src/util/localStorage';
import { deRegisterLoginUser } from 'src/views/auth/login/flow/actions';
import { localStorageKeys} from "../../config/app.config";
import { addError } from '../error/action';
import {
  HTTP_ACTION_DOING,
  HTTP_ACTION_DONE,
  HTTP_ACTION_ERROR,
} from './constants';


interface IcallbackConfig{
    successMessage?: string,
    callbackAction?: object | null,
}
interface IrealHeaders{
    realHeaders: object,
    apiDomain: string,
}
export interface IresponseData{
    error?: string,
    errors?: object,
    message?: string,
    status_code?: string| number,

}
export interface IresponseResult{
    data: IresponseData,
    statusCode: string| number,
}

const successNotify = (message: string='') => {
  notification.success({
    description: '',
    duration: 3,
    message,
  });
};

const defaultCallback = (callbackConfig: IcallbackConfig, method: string, requestResult: IresponseResult = { data: {}, statusCode: 0 }) => {
  const { successMessage, callbackAction } = callbackConfig;
  const info = allInfos[getStore(localStorageKeys.language as string)];
  // Check with _.isEmpty on js function will return true
  if (_.isFunction(callbackAction)) {
    callbackAction(requestResult);
  } else if (SUCCESS_HTTP_CODE.indexOf(Number(requestResult.statusCode)) > -1 && method !== 'get') {
    if (!_.isEmpty(successMessage)) {
      successNotify(successMessage);
    } else {
      successNotify(info[method]);
    }
  }
};

const dispatch = (method: string, url: string, request: Promise<IresponseResult>, dispatcher:any, callbackConfig: IcallbackConfig) => {
  dispatcher({
      payload: {},
      type: HTTP_ACTION_DOING,
  });
  return request.then(({ data, statusCode} : IresponseResult): any=> {
    dispatcher({ type: HTTP_ACTION_DONE });
    defaultCallback(callbackConfig, method, { data, statusCode });
    if (statusCode === UNAUTHENTICATION.CODE) { // 如果是401为授权
      dispatcher(deRegisterLoginUser());
      return Promise.reject();
    }
    if (SUCCESS_HTTP_CODE.indexOf(Number(statusCode)) > -1) {
      return data;
    }
    if (data && (data.error || data.errors || data.message)) {
      const { errors } = data;
      const tErrors = (errors || data.status_code) as object || {};
      if (tErrors) {
        Object.keys(tErrors).forEach((key) => {
          const msgs = tErrors[key];
          msgs.forEach((msg: string) => {
            dispatcher(addError(msg));
          });
        });
      } else if (data.error) {
        dispatcher(addError(data.error));
      } else if (data.message) {
        dispatcher(addError(data.message));
      }
      return Promise.reject();
    }
  }).catch((err) => {
    dispatcher({
      type: HTTP_ACTION_ERROR,
    });
    return Promise.reject(err);
  });
};

export const post = (url: string, data:object = {}, dispatcher: any, callbackConfig:IcallbackConfig = { successMessage: '', callbackAction: null }, httpConfig:IrealHeaders = { realHeaders: {}, apiDomain: '' }) =>
  (dispatch('post', url, http('post', url, data, httpConfig.realHeaders, httpConfig.apiDomain), dispatcher, callbackConfig));

export const get = (url: string, data:object, dispatcher: any, callbackConfig:IcallbackConfig = { successMessage: '', callbackAction: null }, httpConfig:IrealHeaders = { realHeaders: {}, apiDomain: '' }) =>
  (dispatch('get', url, http('get', url, data, httpConfig.realHeaders, httpConfig.apiDomain), dispatcher, callbackConfig));

export const httpDelete = (url: string, data:object, dispatcher: any, callbackConfig:IcallbackConfig = { successMessage: '', callbackAction: null }, httpConfig:IrealHeaders = { realHeaders: {}, apiDomain: '' }) =>
  (dispatch('httpDelete', url, http('delete', url, data, httpConfig.realHeaders, httpConfig.apiDomain), dispatcher, callbackConfig));

export const patch = (url: string, data:object, dispatcher: any, callbackConfig:IcallbackConfig = { successMessage: '', callbackAction: null }, httpConfig:IrealHeaders = { realHeaders: {}, apiDomain: '' }) =>
  (dispatch('patch', url, http('patch', url, data, httpConfig.realHeaders, httpConfig.apiDomain), dispatcher, callbackConfig));
