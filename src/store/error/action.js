import { ADD_ERROR, MARK_READED_ERROR } from './actionType';

export const addError = error => ({
    error,
    type: ADD_ERROR,
});
export const markReadedError = id => ({
    id,
    type: MARK_READED_ERROR,
});
