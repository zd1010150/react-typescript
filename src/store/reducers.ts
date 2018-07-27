import  {combineReducers } from 'redux';
import errorReducer from './error/reducer';
import { Ierror } from './error/types';
import globalsReducer from './global/reducers';
import { IglobalState } from './global/types';
import pageReducer, { IpageState } from './pageReducer';
// import uiReducer from './uiReducer';

export interface IApplicationState extends IpageState{
    global: IglobalState,
    errors: {
        errors: Ierror[]
    },
   // ui: object,
}

export const makeRootReducer = () => (
  combineReducers({
      errors: errorReducer,
      global: globalsReducer, // 注入全局reducer
    ...pageReducer, // 注入页面级reducer
   // ui: uiReducer,
  })
);


export default makeRootReducer;
