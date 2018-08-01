import { LocaleProvider } from 'antd';
import en from 'antd/lib/locale-provider/en_US';
import zh from 'antd/lib/locale-provider/zh_CN';
import * as React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { IApplicationState } from 'store/types';
import { LANGUAGE } from "../config/app.config";

import * as zhLocaleData from 'react-intl/locale-data/zh';
import message from './message';



addLocaleData(zhLocaleData);

interface I18nPros{
  children?: React.ReactNode,
    locale: LANGUAGE
}

class I18n extends React.Component <I18nPros, {}> {
    public render() {
        const { children, locale } = this.props;
        const lanPackage = locale === LANGUAGE.ZH ? zh : en;
        return (
            <LocaleProvider locale={lanPackage}>
                <IntlProvider locale={`${locale}`} messages={message[locale]}>
                    { children }
                </IntlProvider>
            </LocaleProvider>
        )
    }
}
const mapStateToProps = (state: IApplicationState) =>  ({ locale: state.global.language });
export default connect(mapStateToProps)(I18n);

