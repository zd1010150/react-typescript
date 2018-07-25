export const ADD_ERROR = 'ADD_ERROR';
export const MARK_READED_ERROR = 'MARK_READED_ERROR';

export const addError = error => ({
    error,
    type: ADD_ERROR,

});
export const markReadedError = id => ({
    id,
    type: MARK_READED_ERROR,
});
