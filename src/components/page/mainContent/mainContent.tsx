/*tslint:disable:ordered-imports*/
import * as React from 'react';
import { RouteComponentProps } from "react-router";
import {Route, Switch, withRouter } from 'react-router-dom';
import { AccountMainContentComponent, AuthMainContentComponent} from "../index";

class MainContentComponent extends React.Component <RouteComponentProps<any>> {
    public render() {
       return (
                <Switch>
                        <Route path = "/auth" component = {AuthMainContentComponent}/>
                        <Route path = "/" component = {AccountMainContentComponent}/>
                </Switch>
            )
    }
}
export default withRouter(MainContentComponent);