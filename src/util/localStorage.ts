/**
 * 存储localStorage
 */
export const setStore = (name: string, content: any): undefined => {
  let contentStr: string = '';
  if (!name) {
    return;
  }
  if (typeof content !== 'string') {
      contentStr = JSON.stringify(content);
  }
  window.localStorage.setItem(name, contentStr);
};

/**
 * 获取localStorage
 */
export const getStore = (name: string): string | null | undefined => {
  if (!name) {return '';}
  return window.localStorage.getItem(name);
};

export const getStoreByKeys = (keyStr: string): string | null | undefined => {
  const keyStrArr = keyStr.split('.');
  if (!_.isEmpty(keyStrArr)) {
    if (keyStrArr.length === 1) {
      return getStore(keyStrArr[0]);
    }
    const resetKey = keyStrArr.slice(1);
    const obj = JSON.parse(_.isEmpty(getStore(keyStrArr[0])) ? '' : getStore(keyStrArr[0])  );
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
