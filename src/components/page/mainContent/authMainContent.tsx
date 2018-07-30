/*tslint:disable:ordered-imports*/
import * as React from 'react';
import { Switch} from 'react-router-dom';
import { Login, Logout } from 'views/index';
import { PublicRoute } from 'components/ui'
class AuthMainContentComponent extends React.Component <{}> {
    public render() {
        debugger
       return (
                <Switch>
                    <PublicRoute path="/auth/login" component={Login} />
                    <PublicRoute path="/auth/logout" component={Logout} />
                </Switch>
            )
    }
}
export default AuthMainContentComponent;