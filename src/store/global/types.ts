import { Iaction, LANGUAGE } from "../../config/app.config";

export interface IlanguageAction extends Iaction{
    language?: LANGUAGE
}
export interface IaccountAction extends Iaction{
    account?: IloginUser,
}
export interface IpageTitleAction extends Iaction{
    pageTitle?: string,
}

export type GlobalActions = IlanguageAction | IaccountAction | IpageTitleAction;

export interface IloginUser{
    userName: string
}
export interface IglobalState{
    account: IloginUser,
    language: LANGUAGE,
    pageTitle: string
}

