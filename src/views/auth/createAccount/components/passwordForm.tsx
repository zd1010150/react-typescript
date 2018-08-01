
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { FORM_LAYOUT_CONFIG, LANGUAGE } from '../../../../config/app.config';
import { getPwdLevel, passwordStreeLevel } from '../../../../util/password';
import { getExistRule, validator } from '../../../../util/validateMessagesUtil';
import styles from '../index.less';

const cx = classNames.bind(styles);

export enum passwordFormStatus {
    createNew,
    modifyPassword,
    resetPassword,
}

interface IpasswordFormProps {
    editStatus?: passwordFormStatus
}
interface IpasswordFormState {
    isConfirmError?: boolean,
    pwdStreessLevel?: passwordStreeLevel,
}

type propsTypes = IpasswordFormProps & IpasswordFormState & FormComponentProps & InjectedIntlProps;

class PasswordForm extends React.Component<propsTypes> {
    public state = {
        isConfirmError: false,
        pwdStreeLevel: passwordStreeLevel.no
    }
    
    public render() {
        const { editStatus } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { formatMessage } = this.props.intl;
        const locale = this.props.intl.locale === 'zh' ? LANGUAGE.ZH : LANGUAGE.EN;
        const { isConfirmError, pwdStreeLevel } = this.state;
        const isCreateNew = editStatus === passwordFormStatus.createNew;
        const oldPwdEl = editStatus === passwordFormStatus.modifyPassword? (
            <Form.Item
                {...FORM_LAYOUT_CONFIG}
                label={formatMessage({ id: 'global.form.oldPwd' })}
                className = {cx('formItem')}
            >
                {
                    getFieldDecorator('old_password', {
                        initialValue: '',
                        rules: [
                           getExistRule('required', 'password', locale, { required: true })
                        ],
                    })(<Input type="password" size="small" />)
                }
            </Form.Item>
        ): '';
        return (
            <Form layout = "vertical" className = {cx('formWrapper')}>
                { oldPwdEl}
                <Form.Item
                    {...FORM_LAYOUT_CONFIG}
                    label={formatMessage({ id: isCreateNew ? 'global.form.password' :'global.form.newPwd' })}
                    className = {cx('formItem')}
                >
                    {
                        getFieldDecorator('password', {
                            initialValue: '',
                            rules: [
                                getExistRule('required', 'password', locale, { required: true }),
                                {
                                    validator: validator.password(locale),
                                },
                            ],
                        })(<Input type="password" size="small" onInput={this.validatePasswordLevel} />)
                    }
                    <span className="form-tip">
                        {
                            formatMessage(
                                {
                                    id: 'page.createAccount.passwordTip'
                                },
                                {
                                    level: formatMessage({ id: `page.createAccount.passwordLevel.${pwdStreeLevel}` })
                                }
                            )
                        }</span>
                </Form.Item>
                <Form.Item
                    {...FORM_LAYOUT_CONFIG}
                    label={formatMessage({ id: 'global.form.confirmPwd' })}
                    className = {cx('formItem')}
                >
                    {
                        getFieldDecorator('password_confirmation', {
                            initialValue: '',
                            rules: [
                                getExistRule('required', 'confirmPassword', locale, { required: true }),
                                {
                                    validator: validator.password(locale),
                                },
                            ],
                        })(<Input size="small" type="password" onBlur={this.validatePaswordConsistency} />)
                    }
                    {isConfirmError ? <span className="form-tip error-msg">{formatMessage({ id: 'global.form.confirmError' })}</span> : ''}
                </Form.Item>
            </Form>
        );
    }
    private validatePasswordLevel = (e: React.FormEvent<HTMLInputElement>) => {
        window.console.log("dandan")
        const { form } = this.props;
        const pwd = form.getFieldValue('password');
        const level = getPwdLevel(pwd);
        this.setState({
            pwdStreeLevel: level as string
        });
    }
    private validatePaswordConsistency = () => {
        const { form } = this.props;
        const newPwd = form.getFieldValue('password');
        const confirPwd = form.getFieldValue('password_confirmation');
        const isConfirmError = newPwd !== confirPwd;

        this.setState({
            isConfirmError,
        });
        return !isConfirmError;
    }

}


const PasswordFormComponent = Form.create()(injectIntl(PasswordForm));
export default PasswordFormComponent;
