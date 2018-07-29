/*tslint:disable:ordered-imports*/
import {  Dropdown, Icon, Menu } from 'antd';
import classNames from 'classnames/bind';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import zhIcon from 'assets/images/ch-language.png';
import enIcon from 'assets/images/en-language.png';
import { IloginUser } from 'store/global/types';
import { LANGUAGE } from "config/app.config";
import * as styles from './index.less';

interface ItopPanel {
    language: LANGUAGE,
    user: IloginUser,
    onChange(language: LANGUAGE): void,
}
 class TopPanel extends React.Component<ItopPanel & InjectedIntlProps, {}> {

    public render() {
        const cx = classNames.bind(styles);
        const { language, user, intl} = this.props;
        const { formatMessage } = intl;
        const otherLanguage = language === LANGUAGE.ZH ? LANGUAGE.EN : LANGUAGE.ZH;
        const menu = (
            <Menu>
                <Menu.Item>
                    <img src={otherLanguage === LANGUAGE.ZH ? zhIcon : enIcon} className={cx('language-flag')} alt="language" />
                    <button className={cx('ant-dropdown-link')} onClick={this.changeLanguage}>{formatMessage({ id: `global.language.${otherLanguage}` })}</button>
                </Menu.Item>


            </Menu>);
        return (
            <div>
             {formatMessage({id:'global.info.WELCOME_MSG' })}{user.userName}
            <div data-role="language">
                <Dropdown overlay={menu}>
                    <button className={cx('ant-dropdown-link')}>
                        <img className={cx('language-flag')} src={language === LANGUAGE.ZH ? zhIcon : enIcon} alt="language" />
                        <Icon type="down" className="ml-sm" />
                    </button>
                </Dropdown>
            </div>
        </div>)
    }
     private changeLanguage = () => {
         const { language,  onChange} = this.props;
         const otherLanguage = language === LANGUAGE.ZH ? LANGUAGE.EN : LANGUAGE.ZH;
         onChange(otherLanguage)
     }
}
export default injectIntl(TopPanel);
