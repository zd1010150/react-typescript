import { localStorageKeys } from 'config/app.config';
import * as _ from 'lodash';
import * as React from 'react';
import { RouteComponentProps } from "react-router";
import { Redirect, withRouter } from 'react-router-dom';
import { IloginUser} from 'src/store/global/types';
import { getStore} from "util/localStorage";


import { InjectedIntlProps, injectIntl } from 'react-intl';

interface ImainContenttProps{
    account: IloginUser;
    addError: (error:string) => void
}


type PropsType = RouteComponentProps<{}> & ImainContenttProps & InjectedIntlProps;
class MainContentComponent extends React.Component <PropsType, {}> {
    public componentWillReceiveProps(nextProps: PropsType) {
        const isToAuthPage = this.isToAuthPage(nextProps);
        const hasLoggedIn = this.hasLoggedIn(nextProps);
        if(isToAuthPage && hasLoggedIn){
            this.props.addError(this.props.intl.formatMessage({id:'global.error.CANT_VISIT_LOGIN'}));
            return false;
        }else {
            return true;
        }
    }
   public render() {
        debugger
        const isToAuthPage = this.isToAuthPage(this.props);
        const hasLoggedIn = this.hasLoggedIn(this.props);
        const page = (() => {
            if(isToAuthPage){
                if(hasLoggedIn){
                    return <Redirect to="/dashboard" />
                }
            }else{
                if(!hasLoggedIn){
                    return <Redirect to="/auth/login" />
                }
            }
            return <Redirect to={this.props.location.pathname} />
        })();
        return (
            <div> { page } </div>
        );
    }
    private hasLoggedIn = (props: PropsType) => {
        // we'll check the login status in localstorage instead of redux/session storage
        // because it will help us to sync the status across application instances
        const { account } = props;
        const localLoginUser = getStore(localStorageKeys.loginUser as string);
        if (_.isEmpty(localLoginUser)) {
            return false;
        }

        return !_.isEmpty(account);
    }
    private isToAuthPage = (props: PropsType) => {
        const { location } = props;
        return _.startsWith(location.pathname, '/auth/');
    }
}
export default withRouter(injectIntl(MainContentComponent));