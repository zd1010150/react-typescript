import * as _ from 'lodash';
import { combineReducers } from 'redux';
import { LANGUAGE, localStorageKeys} from "../../config/app.config";
import { getStore, setStore } from '../../util/localStorage';
import { DEREGISTER_LOGIN_USER, SET_GLOBAL_SETTING, SET_LOGIN_USER, TOGGLE_LANGUAGE} from './actionTypes';
import { IaccountAction, Iglobalsetting,IglobalsettingAction, IlanguageAction, IloginUser,  } from './types';

const initAccountStr = getStore(localStorageKeys.loginUser as string);
const initAccount = _.isEmpty(initAccountStr) ? {} : JSON.parse(initAccountStr) as IloginUser;

const language = (state:LANGUAGE = navigator.language.indexOf('zh') > -1 ? LANGUAGE.ZH : LANGUAGE.EN, action: IlanguageAction) => {
    let globalLanguage;
    switch (action.type) {
        case TOGGLE_LANGUAGE:
            globalLanguage = action.language;
            break;
        default:
            globalLanguage = state;
            break;
    }
    window.console.log("it is trigger", globalLanguage)
    setStore(localStorageKeys.language as string, globalLanguage as string);
    return globalLanguage;
};

// 账户信息
const account = (state: IloginUser= initAccount, action: IaccountAction) => {
    let innerAccount;
    switch (action.type) {
        case DEREGISTER_LOGIN_USER:
            innerAccount = {};
            break;
        case SET_LOGIN_USER:
            innerAccount =  action.account;
            break;
        default:
            innerAccount =  state;
            break;
    }
    setStore(localStorageKeys.loginUser as string, JSON.stringify(innerAccount) as string);
    return innerAccount;
};
const mappingState = (serverGlobalSettings: any) => {
    return {
        brands: serverGlobalSettings.brand,
        categories: serverGlobalSettings.distributor_category || [],
        positions: serverGlobalSettings.distributor_position || []
    };
}
const settings = (state: Iglobalsetting = {positions: []} as Iglobalsetting , action: IglobalsettingAction) => {
    // tslint:disable-next-line:no-shadowed-variable
    const { type, settings } = action;
    switch (type) {
        case SET_GLOBAL_SETTING:
            return Object.assign({}, state, mappingState(settings))
        default:
            return state;
    }
}



const rootReducer = combineReducers({
    account,
    language,
    settings,
});
export default rootReducer;
