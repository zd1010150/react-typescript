import * as _ from 'lodash';
import { Dispatch } from "redux";
import { get, put } from "../../../store/http/httpAction";
import { SET_ACCOUNT_IMFORMATION } from "./actionTypes";
import { IaccountInfo, IeditAccountFormData, IupdatePwdFormData } from "./types";

const setAccount = (account: IaccountInfo) => ({
  account,
  type: SET_ACCOUNT_IMFORMATION
});

export const getDetail = () => (dispatch: Dispatch<any>): Promise<void> =>
  get("/distributor/me", {}, dispatch).then(({ data }) => {
    if (data && data.user) {
      dispatch(
        setAccount({
          abn: data.user.abn,
          company: data.user.company.company,
          contact_email: data.user.contact_email,
          email: data.user.email,
          first_name: data.user.first_name,
          id: data.user.id,
          last_name: data.user.last_name,
          phone: data.user.phone,
          position_id: data.user.position.id,
          position_name: data.user.position.name,
        })
      );
    }
  });

  export const updataEditAccount = (id: number,values: IeditAccountFormData, successMessage: string, cb: () => void) => (dispatch: Dispatch<any>): Promise<void> =>
  put(`/distributor/distributor-users/${id}`, values, dispatch, { successMessage }).then(({ data }) => {
      if (data) {
          if (_.isFunction(cb)) {
              cb()
          }
      }
  });

  export const updatePwd = (values: IupdatePwdFormData, successMessage: string, cb: () => void)=> (dispatch: Dispatch<any>): Promise<void> =>
  put('/distributor/password/update', values, dispatch, { successMessage }).then(({ data }) => {
      if (data) {
          if (_.isFunction(cb)) {
              cb()
          }
      }
  });
