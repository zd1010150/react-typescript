
import { Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { FORM_LAYOUT_CONFIG, LANGUAGE } from '../../../../config/app.config';
import { Iposition } from '../../../../store/global/types';
import { getExistRule, validator } from '../../../../util/validateMessagesUtil';
import styles from '../index.less';

const cx = classNames.bind(styles);
interface IcontactPersonForm {
    positions: Iposition[]
}


class ContactPersonForm extends React.Component<IcontactPersonForm & FormComponentProps & InjectedIntlProps> {
   
    public render() {
        const { intl, positions } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { formatMessage } = intl;
        const locale = intl.locale === 'zh' ? LANGUAGE.ZH : LANGUAGE.EN;
        return (
            <Form layout="vertical" className={cx('formWrapper')}>
                <div className={cx('fieldsWrapper')}>
                    <Form.Item  {...FORM_LAYOUT_CONFIG} label={formatMessage({ id: 'global.form.lastName' })} className={cx('formItem')}>
                        {getFieldDecorator('last_name', {
                            rules: [
                                getExistRule('required', 'lastName', locale, { required: true }),
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item  {...FORM_LAYOUT_CONFIG} label={formatMessage({ id: 'global.form.firstName' })} className={cx('formItem')}>
                        {getFieldDecorator('first_name', {
                            rules: [
                                getExistRule('required', 'firstName', locale, { required: true }),
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item
                        {...FORM_LAYOUT_CONFIG}
                        label={formatMessage({ id: 'global.form.phone' })}
                        className={cx('formItem')}
                    >
                        {
                            getFieldDecorator('phone', {
                                rules: [
                                    getExistRule('required', 'phone', locale, { required: true }),
                                    {
                                        validator: validator.phone(locale),
                                    }],
                            })(<Input />)}
                    </Form.Item>
                    <Form.Item
                        {...FORM_LAYOUT_CONFIG}
                        label={formatMessage({ id: 'global.form.email' })}
                        className={cx('formItem')}
                    >
                        {
                            getFieldDecorator('contact_email', {
                                rules: [
                                    getExistRule('required', 'email', locale, { required: true }),
                                    getExistRule('email', 'email', locale),
                                ],
                            })(<Input />)}
                    </Form.Item>
                    <Form.Item  {...FORM_LAYOUT_CONFIG} label={formatMessage({ id: 'global.form.position' })} className={cx('formItem')}>
                        {
                            getFieldDecorator('position_id', {
                                initialValue: (positions[0] && positions[0].id) || '',
                                rules: [
                                    getExistRule('required', 'position', locale, { required: true }),
                                ]
                            })(<Select>
                                {positions.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)}
                            </Select>)
                        }
                    </Form.Item>
                </div>
            </Form>
        );
    }

}


const ContactPersonFormComponent = Form.create()(injectIntl(ContactPersonForm));
export default ContactPersonFormComponent;
