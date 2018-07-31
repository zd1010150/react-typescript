import { Button } from 'antd';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from 'redux';
import { Iposition } from '../../../../store/global/types';
import { IApplicationState } from '../../../../store/reducers'
import CompanyInforForm from '../components/companyInfoForm';
import ContactPersonForm from '../components/contactPersonForm';
import PasswordForm, { passwordFormStatus } from '../components/passwordForm';
import SignInfoForm from '../components/signInfoForm';
import { createNewAccount } from '../flow/actions';
import { ICreateAccountForm } from '../flow/types';

export interface Iprops {
    positions: Iposition[],
    createNewAccountDispatch: (formData: ICreateAccountForm, successMessage: string, cb: ()=> void)=>void
}
interface IvalidateResult{
    data: any,
    validate: boolean
}
type IcreateAccountProps = Iprops  & InjectedIntlProps & RouteComponentProps<any>;
export class CreateAccount extends React.Component <IcreateAccountProps, {}> {
    
    private companyInfoForm:any;
    private contactPersonForm:any;
    private passwordForm:any;
    private signInForm:any;
    public render() {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <h3 className="section-title">{ formatMessage({ id: 'page.createAccount.companyInfo'}) }</h3>
                <CompanyInforForm ref={(c) => this.companyInfoForm = c}/>
                <h3 className="section-title">{ formatMessage({ id: 'page.createAccount.contactPerson'}) }</h3>
                <ContactPersonForm positions={this.props.positions} ref={c => this.contactPersonForm=c}/>
                <h3 className="section-title">{ formatMessage({ id: 'page.createAccount.signInformation'}) }</h3>
                <SignInfoForm ref={c => this.signInForm=c}/>
                <PasswordForm editStatus={passwordFormStatus.createNew} ref={c => this.passwordForm=c}/>
                <Button type="primary" onClick={this.createNewAccount}>{formatMessage({ id: 'global.ui.button.createNewAccount'})}</Button>
            </div>
        )
    }
    private createNewAccount = async() => {
        const { createNewAccountDispatch, intl, history} = this.props;
        const getPromiseWrapper = (form: any ) => new Promise((resolve) => {
            form.validateFieldsAndScroll((err: any, values: object) => {
                resolve({
                    data: values,
                    validate: !err, 
                });
              });
        });
        Promise.all([
            getPromiseWrapper(this.companyInfoForm), 
            getPromiseWrapper(this.contactPersonForm), 
            getPromiseWrapper(this.signInForm), 
            getPromiseWrapper(this.passwordForm)
        ]).then(([companyInfoForm,contactPersonForm, signInfoForm, passwordForm]: [IvalidateResult,IvalidateResult,IvalidateResult,IvalidateResult])=>{
            const {password_confirmation, password} = passwordForm.data;
            const validateResult = companyInfoForm.validate && contactPersonForm.validate && signInfoForm.validate && passwordForm.validate && (password === password_confirmation);
            if(validateResult){
                const postData: any = {
                    ...companyInfoForm.data,
                    ...contactPersonForm.data,
                    ...signInfoForm.data,
                    password: passwordForm.data.password
                }
                createNewAccountDispatch(postData, intl.formatMessage({id: 'global.info.createNewAccountSuccess'}), ()=>{
                    history.replace('/auth/login')
                })
            }
        })
    }
}
const mapStateToProps = (state: IApplicationState) =>  ({ positions: state.global.settings.positions });
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        createNewAccountDispatch: (formData: ICreateAccountForm, successMessage: string, cb: () => {}) => dispatch(createNewAccount(formData, successMessage, cb))
    };
}
const CreateAccountComponent= withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CreateAccount)));
export default CreateAccountComponent;