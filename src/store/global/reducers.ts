import { combineReducers } from 'redux';
import { setStore } from 'src/util/localStorage';
import { navLanguage }  from 'src/util/navigationUtil';
import { SET_LOGIN_USER, SET_PAGE_TITLE, TOGGLE_LANGUAGE } from './actionTypes';
import { IloginUser } from './types';
interface IlanguageAction extends Iaction{
    language?: LANGUAGE
}
const language = (state:LANGUAGE = navLanguage, action: IlanguageAction) => {
    let globalLanguage;
    switch (action.type) {
        case TOGGLE_LANGUAGE:
            globalLanguage = action.language;
            break;
        default:
            globalLanguage = state;
            break;
    }
    setStore(localStorageKeys.language as string, globalLanguage as string);
    return globalLanguage;
};
interface IaccountAction extends Iaction{
    account?: IloginUser,
}
// 账户信息
const account = (state: IloginUser= { userName: 'DANDAN' }, action: IaccountAction) => {
    let innerAccount;
    switch (action.type) {
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


interface IpageTitleAction extends Iaction{
    pageTitle?: string,
}
const pageTitle = (state:string = 'global.pageTitle.leads', action: IpageTitleAction) => {
    switch (action.type) {
        case SET_PAGE_TITLE:
            return action.pageTitle;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    account,
    language,
    pageTitle,
});
export default rootReducer;
