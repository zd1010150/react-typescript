import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleLanguage } from 'src/store/global/actions';
import { GlobalActions, IloginUser} from 'src/store/global/types';
import { IApplicationState} from 'src/store/reducers';
import { LANGUAGE } from "../../config/app.config";
import {
    Logo,
    MainContent,
    TopPanel
} from '../page/index';

interface ImainLayoutProps{
    locale: LANGUAGE;
    account: IloginUser;
    changeLanugage:  (language: LANGUAGE) => void
}

const layout: React.SFC<ImainLayoutProps >= ({locale, account, changeLanugage}) => (
    <div className="page-wrapper">
        <header className="page-header">
            <div className="panel wrapper">
                <TopPanel language={locale} onChange={changeLanugage} user={account}/>
            </div>
        </header>
        <div className="section nav-sections">
            <Logo language={locale}/>
        </div>
        <main id="maincontent" className="page-main">

            <div className="columns">
                <MainContent/>
            </div>
        </main>
    </div>
);
const mapStateToProps = (state: IApplicationState) =>  ({ locale: state.global.language, account: state.global.account });
const mapDispatchToProps = (dispatch: Dispatch<GlobalActions>) => {
    return {
        changeLanugage: (language: LANGUAGE) => dispatch(toggleLanguage(language))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(layout);




