
import { IaccountInfo } from "views/accountInfo/flow/types";
import { Ierror } from './error/types';
import { IglobalState } from './global/types';

export interface IpageState {
  accountInfo: { account: IaccountInfo };
}
export interface IApplicationState extends IpageState{
    global: IglobalState,
    errors: {
        errors: Ierror[]
    },
}
export interface IantFormValidateResult{
    data: any,
    validate: boolean
}
export enum formStatus {
    create,
    edit,
}