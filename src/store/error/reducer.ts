import { combineReducers } from 'redux';
import { ADD_ERROR, MARK_READED_ERROR } from './actionType';
import { Ierror, IerrorAction } from './types';



const addError = (state: Ierror[], error: string='') => {
  const id = state.length + 1;
  const newState = state.slice();
  newState.push({
    id,
    msg: error,
    readed: false,
  });
  return newState;
};

const markReadedError = (state: Ierror[], errorId: number=-1) => state.map((item) => {
  if (item.id === errorId) {
    return Object.assign({}, item, { readed: true });
  }
  return item;
});

const errors = (state: Ierror[] = [], action: IerrorAction) => {
  switch (action.type) {
    case ADD_ERROR:
      return addError(state, action.error);
    case MARK_READED_ERROR:
      return markReadedError(state, action.id);
    default:
      return state;
  }
};

export default combineReducers({ errors });
