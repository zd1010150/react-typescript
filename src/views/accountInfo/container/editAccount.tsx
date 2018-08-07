import { Button } from 'antd';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from 'redux';
import { Iposition } from '../../../store/global/types';
import { formStatus, IantFormValidateResult, IApplicationState } from '../../../store/types';
import CompanyInforForm from '../../auth/createAccount/components/companyInfoForm';
import ContactPersonForm from '../../auth/createAccount/components/contactPersonForm';
import SignInfoForm from '../../auth/createAccount/components/signInfoForm';
import { getDetail, updataEditAccount } from '../flow/actions';
import { IaccountInfo, IeditAccountFormData } from '../flow/types';


export interface Iprops {
    positions: Iposition[],
    editObject: IaccountInfo,
    updataEditAccountDispatch: (id: number, formData: IeditAccountFormData, successMessage: string, cb: ()=> void)=>void,
    getDetailDispatch: () => void
}

type IcreateAccountProps = Iprops  & InjectedIntlProps & RouteComponentProps<any>;
export class EditAccount extends React.Component <IcreateAccountProps, {}> {
    
    
    private contactPersonForm:any;
    public componentDidMount(){
        this.props.getDetailDispatch()
    }
    public render() {
        const { editObject } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <ContactPersonForm positions={this.props.positions}  editStatus={formStatus.edit} editObject={editObject} ref={c => this.contactPersonForm=c}/>
                <CompanyInforForm editStatus={formStatus.edit} editObject={editObject}/>
                <SignInfoForm  editStatus={formStatus.edit} editObject={editObject}/>
                <Button onClick={this.updateAccount}>{formatMessage({ id: 'global.ui.button.save'})}</Button>
            </div>
        )
    }
    private updateAccount = async() => {
        const { updataEditAccountDispatch, intl, history, editObject} = this.props;
        const getPromiseWrapper = (form: any ) => new Promise((resolve) => {
            form.validateFieldsAndScroll((err: any, values: object) => {
                resolve({
                    data: values,
                    validate: !err, 
                });
              });
        });
        Promise.all([
            getPromiseWrapper(this.contactPersonForm), 
        ]).then(([contactPersonForm,]: [IantFormValidateResult])=>{
            const validateResult = contactPersonForm.validate;
            const { first_name, last_name, phone, contact_email, position_id } = contactPersonForm.data;
            if(validateResult){
                const postData: IeditAccountFormData = {
                    contact_email,first_name, last_name, phone, position_id
                }
                updataEditAccountDispatch(editObject.id, postData, intl.formatMessage({id: 'global.info.updateAccountSuccess'}), ()=>{
                    history.replace('/dashboard')
                })
            }
        })
    }
}
const mapStateToProps = (state: IApplicationState) =>  ({ positions: state.global.settings.positions, editObject: state.accountInfo.account});
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getDetailDispatch: () => dispatch(getDetail()),
        updataEditAccountDispatch: (id: number, formData: IeditAccountFormData, successMessage: string, cb: () => {}) => dispatch(updataEditAccount(id, formData, successMessage, cb)),
        
    };
}
const EditAccountComponent= withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(EditAccount)));
export default EditAccountComponent;