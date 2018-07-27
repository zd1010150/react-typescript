import * as _ from 'lodash';
export const deconstructionObj = (obj: object,outerRootKey: string) => {
  const result = {};
  const traverseObj = (rootKey: string, root: object) => {
    for (const key of Object.keys(root)) {
      if (!_.isObject(root[key])) {
        result[`${rootKey}.${key}`] = root[key];
      } else {
        traverseObj(`${rootKey}.${key}`, root[key]);
      }
    }
  };
  traverseObj(outerRootKey, obj);
  return result;
};
export const deconstructLanguage = (root:object, language: string,rootKey: string) => {
  const result = {};
  for (const key of Object.keys(root)) {
    result[key] = root[key][language];
  }
  return deconstructionObj(result,rootKey);
};
