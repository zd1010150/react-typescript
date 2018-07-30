import { ActionCreator } from 'redux';
import { LANGUAGE} from "../../config/app.config";
import {
    SET_LOGIN_USER,
    TOGGLE_LANGUAGE,
} from './actionTypes';
import {
    IaccountAction,
    IlanguageAction,
    IloginUser,
} from './types';


// Type these action creators with `: ActionCreator<ActionTypeYouWantToPass>`.
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly.

export const toggleLanguage: ActionCreator<IlanguageAction> = (language: LANGUAGE) => ({
    language,
    type: TOGGLE_LANGUAGE,
});

export const setLoginUser: ActionCreator<IaccountAction> = (
    account: IloginUser
) => ({
    account,
    type: SET_LOGIN_USER,
});


