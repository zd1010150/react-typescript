import { IaccountInfo } from "views/accountInfo/flow/types";
import { IenquryState } from 'views/queryGoods/flow/types';
import { Ierror } from './error/types';
import { IglobalState } from './global/types';

export interface IpageState {
  accountInfo: { account: IaccountInfo };
  enquery: IenquryState
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
/** laravel paging params  */
export interface IpaginationParams{
    page: number,
    per_page: number,
    orderBy?:string,
    sortedBy?:string,
    search?: string,
    total?: number,
}

