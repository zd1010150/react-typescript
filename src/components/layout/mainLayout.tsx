import classNames from 'classnames/bind';
import { AccountMainContentComponent, AuthMainContentComponent} from "components/page";
import * as React from 'react';
import { connect } from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import { Dispatch } from 'redux';
import { toggleLanguage } from 'src/store/global/actions';
import { GlobalActions, IloginUser} from 'src/store/global/types';
import { IApplicationState} from 'src/store/reducers';
import { LANGUAGE } from "../../config/app.config";
import {
    Logo,
    PageTitle,
    TopPanel
} from '../page/index';
import * as styles from './index.less';

interface ImainLayoutProps{
    locale: LANGUAGE;
    account: IloginUser;
    changeLanugage:  (language: LANGUAGE) => void
}
const cx = classNames.bind(styles);
const layout: React.SFC<ImainLayoutProps >= ({locale, account, changeLanugage}) => (
    <div className="page-wrapper">
        <header className="page-header">
            <div className="panel wrapper">
                <TopPanel language={locale} onChange={changeLanugage}/>
            </div>
        </header>
        <div className={classNames("section",cx("nav-sections"))}>
            <Logo language={locale}/>
        </div>
        <main id="maincontent" className={cx("page-main")}>
            <PageTitle/>
            <div className="columns">
                <Switch>
                    <Route path = "/auth" component = {AuthMainContentComponent}/>
                    <Route path = "/" component = {AccountMainContentComponent}/>
                </Switch>
            </div>
        </main>
    </div>
);
const mapStateToProps = (state: IApplicationState) =>  ({ locale: state.global.language, account: state.global.account });
const mapDispatchToProps = (dispatch: Dispatch<GlobalActions>) => {
    return {
        changeLanugage: (language: LANGUAGE) => dispatch(toggleLanguage(language)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(layout);
