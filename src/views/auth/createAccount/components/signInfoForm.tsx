
import { Form, Input} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {FORM_LAYOUT_CONFIG, LANGUAGE} from '../../../../config/app.config'
import { getExistRule } from '../../../../util/validateMessagesUtil';
import styles from '../index.less';

const cx = classNames.bind(styles);



class SignInfoForm extends React.Component <FormComponentProps & InjectedIntlProps> {
    
    public render() {
        const {getFieldDecorator} = this.props.form;
        const {formatMessage} = this.props.intl;
        const locale = this.props.intl.locale === 'zh' ? LANGUAGE.ZH : LANGUAGE.EN;
        return (
            <Form layout = "vertical" className = {cx('formWrapper')}>
                <div className = {cx('fieldsWrapper')}>
                <Form.Item
                        {...FORM_LAYOUT_CONFIG}
                        label={formatMessage({ id: 'global.form.email' })}
                        className={cx('formItem')}
                    >
                        {
                            getFieldDecorator('email', {
                                rules: [
                                    getExistRule('required', 'email', locale, { required: true }),
                                    getExistRule('email', 'email', locale),
                                ],
                            })(<Input />)}
                    </Form.Item>
                </div>
            </Form>
        );
    }

}


const SignInfoFormComponent = Form.create()(injectIntl(SignInfoForm));
export default SignInfoFormComponent;
