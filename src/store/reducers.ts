import { combineReducers } from 'redux';
import errorReducer from './error/reducer';
import pageReducer from './pageReducer';
import uiReducer from './uiReducer';

export const makeRootReducer = (asyncReducers = {}) => (
  combineReducers({
    global: globalsReducer, // 注入全局reducer
    errors: errorReducer,
    ...asyncReducers, // hook 以后用来注入异步reducer
    ...pageReducer, // 注入页面级reducer
    ui: uiReducer,
  })
);

export const injectReducers = (store, reducers) => {
  store.asyncReducers = { // eslint-disable-line no-param-reassign
    ...store.asyncReducers,
    ...reducers,
  };
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
