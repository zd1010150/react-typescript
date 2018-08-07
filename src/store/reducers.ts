import  {combineReducers } from 'redux';
import errorReducer from './error/reducer';

import globalsReducer from './global/reducers';
import pageReducer from './pageReducer';
import uiReducer from './ui/reducer';



export const makeRootReducer = () => (
  combineReducers({
      errors: errorReducer,
      global: globalsReducer, // 注入全局reducer
    ...pageReducer, // 注入页面级reducer
      ui: uiReducer,
  })
);


export default makeRootReducer;
