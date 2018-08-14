import * as _ from "lodash";
import { combineReducers } from "redux";
import { LANGUAGE, localStorageKeys } from "../../config/app.config";
import { getStore, setStore } from "../../util/localStorage";
import {
  DEREGISTER_LOGIN_USER,
  SET_GLOBAL_SETTING,
  SET_LOGIN_USER,
  TOGGLE_LANGUAGE
} from "./actionTypes";
import {
  IaccountAction,
  Iglobalsetting,
  IglobalsettingAction,
  IlanguageAction,
  IloginUser
} from "./types";

const initAccountStr = getStore(localStorageKeys.loginUser as string);
const initAccount = _.isEmpty(initAccountStr)
  ? {}
  : (JSON.parse(initAccountStr) as IloginUser);
const localLanguage = getStore(localStorageKeys.language as string) === "zh" ? LANGUAGE.ZH: LANGUAGE.EN;
const navLanguage = navigator.language.indexOf("zh") > -1 ? LANGUAGE.ZH: LANGUAGE.EN;
const language = (
  state: LANGUAGE = localLanguage || navLanguage,
  action: IlanguageAction
) => {
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

// 账户信息
const account = (state: IloginUser = initAccount, action: IaccountAction) => {
  let innerAccount;
  switch (action.type) {
    case DEREGISTER_LOGIN_USER:
      innerAccount = {};
      break;
    case SET_LOGIN_USER:
      innerAccount = action.account;
      break;
    default:
      innerAccount = state;
      break;
  }
  setStore(
    localStorageKeys.loginUser as string,
    JSON.stringify(innerAccount) as string
  );
  return innerAccount;
};
const mappingState = (state: Iglobalsetting, serverGlobalSettings: any) => {
  const newState = { ...state };
  if (!_.isEmpty(serverGlobalSettings.distributor_position)) {
    Object.assign(newState, {
      positions: serverGlobalSettings.distributor_position
    });
  }
  if (!_.isEmpty(serverGlobalSettings.brand)) {
    Object.assign(newState, {
      brands: serverGlobalSettings.brand.map((b: any) => ({
        id: b.id,
        name_en: b.name,
        name_zh: b.name_zh,
        name_zh_pinyin: b.name_zh_pinyin,
        url: b.logo_url
      }))
    });
  }
  if (!_.isEmpty(serverGlobalSettings.distributor_category)) {
    Object.assign(newState, {
      categories: serverGlobalSettings.distributor_category.map((c: any) => ({
          id: c.id,
          name_en: c.name,
          name_zh: c.name_zh
        }))
    })
  }
  return newState;
};
const settings = (
  state: Iglobalsetting = { positions: [] } as Iglobalsetting,
  action: IglobalsettingAction
) => {
  // tslint:disable-next-line:no-shadowed-variable
  const { type, settings } = action;
  switch (type) {
    case SET_GLOBAL_SETTING:
      return mappingState(state, settings);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account,
  language,
  settings
});
export default rootReducer;
