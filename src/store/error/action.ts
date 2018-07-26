import { ADD_ERROR, MARK_READED_ERROR } from './actionType';

export const addError = (error: string) => ({
    error,
    type: ADD_ERROR,
});
export const markReadedError = (id: number) => ({
    id,
    type: MARK_READED_ERROR,
});
