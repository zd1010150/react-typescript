import { Iaction } from "../../../config/app.config";

export interface IaccountInfo {
  id: number;
  company: string;
  abn?: string;
  first_name: string;
  last_name: string;
  phone: string;
  contact_email: string;
  email: string;
  position_id: number;
  position_name: string;
}
export interface IaccountAction extends Iaction {
  account: IaccountInfo;
}
export interface IeditAccountFormData {
  last_name?: string;
  first_name?: string;
  phone?: string;
  contact_email?: string;
  position_id?: number;
}
export interface IupdatePwdFormData {
  old_password: string;
  password: string;
  password_confirmation: string,
}

