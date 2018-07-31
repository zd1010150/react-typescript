export interface IcompanyFormData{
    company: string,
    abn: string
}
export interface IcontactPersonFormData{
    first_name: string,
    last_name: string,
    phone: string,
    contact_email: string,
    position_id: number,
}
export interface IsignInfoFormData{
    email: string,
    password: string
}
export type ICreateAccountForm = IcompanyFormData & IcontactPersonFormData & IsignInfoFormData;
