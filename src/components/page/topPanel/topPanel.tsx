/*tslint:disable:ordered-imports*/
import * as _ from 'lodash';
import { Dropdown, Icon, Menu, Modal } from 'antd';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import zhIcon from 'assets/images/ch-language.png';
import enIcon from 'assets/images/en-language.png';
import { LANGUAGE } from "../../../config/app.config";
import * as styles from './index.less';
import { UserName } from '../../ui/index';
import { IloginUser } from '../../../store/global/types';

interface ItopPanel {
    language: LANGUAGE,
    account: IloginUser,
    onChange(language: LANGUAGE): void,
    deRegisterLoginUserDispatch(): void
}
class TopPanel extends React.Component<ItopPanel & InjectedIntlProps, {}> {

    public render() {
        const cx = classNames.bind(styles);
        const { language, intl, account} = this.props;
        const { formatMessage } = intl;
        const otherLanguage = language === LANGUAGE.ZH ? LANGUAGE.EN : LANGUAGE.ZH;
        const languageMenu = (
            <Menu>
                <Menu.Item>
                    <button className={cx('ant-dropdown-link')} onClick={this.changeLanguage}>
                        <img src={otherLanguage === LANGUAGE.ZH ? zhIcon : enIcon} className={cx('language-flag')} alt="language" />
                        {formatMessage({ id: `global.language.${otherLanguage}` })}
                    </button>
                </Menu.Item>
            </Menu>);
        const userMenu = (
            <Menu>
                <Menu.Item>
                    <button className={cx('ant-dropdown-link')} onClick={this.logout}>{formatMessage({ id: `global.ui.button.logout` })}</button>
                </Menu.Item>
            </Menu>);
        const userNameEl = _.isEmpty(`${account.userId}`) ? <span>{formatMessage({ id: 'global.info.WELCOME_MSG' })}</span> : (<Dropdown overlay={userMenu} >
                    <button className={cx('ant-dropdown-link')}>
                        {formatMessage({ id: 'global.info.WELCOME_MSG' })}
                        <UserName />
                        <Icon type="down" />
                    </button>
                </Dropdown>
            );
        return (
            <div className={cx('panel-header')}>
                <span className={cx('username')}>
                    { userNameEl }
                </span>
                <div data-role="language" className="toggle-language">
                    <Dropdown overlay={languageMenu}>
                        <button className={cx('ant-dropdown-link')}>
                            <img className={cx('language-flag')} src={language === LANGUAGE.ZH ? zhIcon : enIcon} alt="language" />
                            <Icon type="down" className="ml-sm" />
                        </button>
                    </Dropdown>
                </div>
            </div>)
    }
    private changeLanguage = () => {
        const { language, onChange } = this.props;
        const otherLanguage = language === LANGUAGE.ZH ? LANGUAGE.EN : LANGUAGE.ZH;
        onChange(otherLanguage)
    }
    private logout = () => {
        const { deRegisterLoginUserDispatch } = this.props;
        Modal.confirm({
            title: 'Confirm',
            // tslint:disable-next-line:object-literal-sort-keys
            content: '你确定退出',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                deRegisterLoginUserDispatch()
            }
        });
    }
}
export default injectIntl(TopPanel);
