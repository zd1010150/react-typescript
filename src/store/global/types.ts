import { Iaction, LANGUAGE } from "../../config/app.config";

export interface IlanguageAction extends Iaction{
    language?: LANGUAGE
}
export interface IaccountAction extends Iaction{
    account?: IloginUser,
}


export type GlobalActions = IlanguageAction & IaccountAction;

export interface IloginUser{
    firstName?: string,
    lastName?: string,
    token?: string,
    userId?: number,
    email?: string,
}
export interface IglobalState{
    account: IloginUser,
    language: LANGUAGE
}
export interface IloginFormData{
    email: string,
    password: string
}