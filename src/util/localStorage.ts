import * as _ from 'lodash';
/**
 * 存储localStorage
 */
export const setStore = (name: string, content: any): void => {
  let contentStr: string = '';
  if (!name) {
    return;
  }
  if (typeof content !== 'string') {
      contentStr = JSON.stringify(content);
  }else{
    contentStr = content;
  }
  window.localStorage.setItem(name, contentStr);
};

/**
 * 获取localStorage
 */
export const getStore = (name: string): string=> {
  if (!name) {return '';}
  const result: string | null | undefined = window.localStorage.getItem(name);
  return result ? result : '';
};

export const getStoreByKeys = (keyStr: string): string | null | undefined => {
  const keyStrArr = keyStr.split('.');
  if (!_.isEmpty(keyStrArr)) {
    if (keyStrArr.length === 1) {
      return getStore(keyStrArr[0]);
    }
    const resetKey = keyStrArr.slice(1);
    const obj = JSON.parse(getStore(keyStrArr[0]));
    return _.get(obj, resetKey, '');
  } return '';
};
/**
 * 删除localStorage
 */
export const removeStore = (name: string): void => {
  if (!name) {return;}
  window.localStorage.removeItem(name);
};

// 同步redux的状态到localstorage里面
export const syncStateAndLocalStorage = (state: object): void => {
  for (const o in state) {
      if (state.hasOwnProperty(o)) {
          const value: object | string = state[o];
          setStore(o, typeof value === 'object' ? JSON.stringify(value) : value);
      }
  }

};
