
import { Form, Input} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { formStatus } from 'store/types';
import {IaccountInfo} from 'views/accountInfo/flow/types';
import { FORM_LAYOUT_CONFIG, LANGUAGE } from '../../../../config/app.config';
import { getExistRule } from '../../../../util/validateMessagesUtil';
import styles from '../index.less';

const cx = classNames.bind(styles);


interface IProps {
    editStatus?: formStatus,
    editObject?: IaccountInfo,
}
type propsTypes = IProps & FormComponentProps & InjectedIntlProps;


class CompanyInfoForm extends React.Component <propsTypes> {
   public render() {
        const { editObject } = this.props;
        const {getFieldDecorator} = this.props.form;
        const {formatMessage} = this.props.intl;
        const locale = this.props.intl.locale === 'zh' ? LANGUAGE.ZH : LANGUAGE.EN;
        const isEdting = this.props.editStatus === formStatus.edit; // editing then disabled the input 
        const isRequired = !isEdting;
        return (
            <Form layout = "vertical" className = {cx('formWrapper')}>
                <div className = {cx('fieldsWrapper')}>
                    <Form.Item  {...FORM_LAYOUT_CONFIG} label = {formatMessage({id: 'global.form.company'})} className = {cx('formItem')}>
                        {getFieldDecorator('company', {
                            initialValue: isEdting? (editObject ? editObject.company : undefined) : undefined,
                            rules: [
                                isRequired?getExistRule('required', 'company', locale, { required: true }): {},
                            ],
                        })(<Input disabled={isEdting} />)}
                    </Form.Item>
                    <Form.Item  {...FORM_LAYOUT_CONFIG}  label = {formatMessage({id: 'global.form.abn'})} className = {cx('formItem')}>
                        {getFieldDecorator('abn', {
                            initialValue: isEdting? (editObject ? editObject.abn : '') : '',
                        })(<Input  placeholder = {formatMessage({id: 'page.createAccount.abnHolder'})} disabled={isEdting} />)}
                    </Form.Item>
                </div>
            </Form>
        );
    }

}


const CompanyInfoFormComponent = Form.create()(injectIntl(CompanyInfoForm));
export default CompanyInfoFormComponent;
