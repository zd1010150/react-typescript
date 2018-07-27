import { ActionCreator } from 'redux';
import { LANGUAGE} from "../../config/app.config";
// import * as _ from 'lodash';
// import { get, post } from 'src/store/http/httpAction';
import {
    SET_LOGIN_USER,
    TOGGLE_LANGUAGE,
} from './actionTypes';
// interface IloginUserSetting = {
//
// }
//
// // export const setUserDetail = (payload, globalSetting) => ({
// //     globalSetting,
// //     payload,
// //     type: SET_LOGIN_USER,
// // });
//
// export const fetchLoginUserDetail = () => (dispatch, getState) => get('/admin/me', {}, dispatch).then((data) => {
//     //dispatch(setUserDetail(d));
// });


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

export const fetchLoginUserDetail ={
};


