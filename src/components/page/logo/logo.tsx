import classNames from 'classnames/bind';
import {LANGUAGE} from "config/app.config";
import * as React from 'react';
import enLogo from 'src/assets/images/en-logo.png';
import zhLogo from 'src/assets/images/zh-logo.png';
import * as styles from './index.less';

interface Ilogo {
    language: LANGUAGE
}
const cx = classNames.bind(styles);
 class Logo extends React.Component<Ilogo, {}> {
    public render() {
        const language = this.props.language;
        return <div className={cx('logo-wrapper')}><img className={cx('logo')} src = { language === LANGUAGE.ZH ? zhLogo : enLogo} alt = ""/></div>
    }
}
export default Logo;