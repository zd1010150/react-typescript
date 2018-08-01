
import { Form, Input} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { formStatus } from 'store/types';
import {IaccountInfo} from 'views/accountInfo/flow/types';
import {FORM_LAYOUT_CONFIG, LANGUAGE} from '../../../../config/app.config'
import { getExistRule } from '../../../../util/validateMessagesUtil';
import styles from '../index.less';

const cx = classNames.bind(styles);


interface IProps {
    editStatus?: formStatus,
    editObject?: IaccountInfo,
}
type propsTypes = IProps & FormComponentProps & InjectedIntlProps;


class SignInfoForm extends React.Component <propsTypes> {
    
    public render() {
        const { editObject } = this.props;
        const {getFieldDecorator} = this.props.form;
        const {formatMessage} = this.props.intl;
        const locale = this.props.intl.locale === 'zh' ? LANGUAGE.ZH : LANGUAGE.EN;
        const isEdting = this.props.editStatus === formStatus.edit; // editing then disabled the input 
        const isRequired =  !isEdting;
        return (
            <Form layout = "vertical" className = {cx('formWrapper')}>
                <div className = {cx('fieldsWrapper')}>
                <Form.Item
                        {...FORM_LAYOUT_CONFIG}
                        label={formatMessage({ id: 'global.form.loginEmail' })}
                        className={cx('formItem')}
                    >
                        {
                            getFieldDecorator('email', {
                                initialValue: isEdting? (editObject ? editObject.email : '') : '',
                                rules: [
                                    isRequired? getExistRule('required', 'loginEmail', locale, { required: true }): {},
                                    getExistRule('email', 'loginEmail', locale),
                                ],
                            })(<Input disabled={isEdting}/>)}
                    </Form.Item>
                </div>
            </Form>
        );
    }

}


const SignInfoFormComponent = Form.create()(injectIntl(SignInfoForm));
export default SignInfoFormComponent;
