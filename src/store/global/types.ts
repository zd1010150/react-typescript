import { Iaction, LANGUAGE } from "../../config/app.config";

/** action interface begin */
export interface IlanguageAction extends Iaction{
    language?: LANGUAGE
}
export interface IaccountAction extends Iaction{
    account?: IloginUser,
}
export interface IglobalsettingAction extends Iaction{
    settings?: Iglobalsetting
}

export type GlobalActions = IlanguageAction & IaccountAction & IglobalsettingAction;
/** action interface end */

/** state interface begin */


export interface Iposition{
    id: number,
    name: string,
}
export interface Ipositions{
    [index: number]: Iposition
}
export interface Iglobalsetting {
    positions?: Ipositions
}
export interface IloginUser{
    firstName?: string,
    lastName?: string,
    token?: string,
    userId?: number,
    email?: string,
}

/** global state */
export interface IglobalState{
    account: IloginUser,
    language: LANGUAGE,
    settings: Iglobalsetting
}

/** state interface end */

/** other */

export interface IloginFormData{
    email: string,
    password: string
}

export interface InotificationData{
    icon?: string,
    info?: string,
    title?: string,
    backUrl?: string,
}
