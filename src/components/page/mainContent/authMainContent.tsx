/*tslint:disable:ordered-imports*/
import * as React from 'react';
import { Switch } from 'react-router';
import { Login, Logout, CreateNewAccount } from '../../../views/index';
import { PublicRoute } from '../../ui/index'
class AuthMainContentComponent extends React.Component <{}> {
    public render() {
        window.console.log("auth change ======")
       
    
       return (
                <Switch>
                    <PublicRoute path="/auth/login" component={Login} />
                    <PublicRoute path="/auth/logout" component={Logout} />
                    <PublicRoute path="/auth/createNewAccount" component={CreateNewAccount} />
                </Switch>
            )
    }
}
export default AuthMainContentComponent;