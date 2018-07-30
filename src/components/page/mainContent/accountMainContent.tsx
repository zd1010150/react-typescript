/*tslint:disable:ordered-imports*/
import * as React from 'react';
import {Switch} from 'react-router-dom';
import {AccountInfo, QueryGoods} from 'views/index';
import {Layout} from 'antd';
import { LeftNav } from 'components/page/index';
import { PrivateRoute } from 'components/ui';

const {Sider, Content} = Layout;
class AccountMainContentComponent extends React.Component <{}> {
    public render() {

            return (
                <Layout>
                    <Sider><LeftNav/></Sider>
                    <Content>
                        <Switch>
                            <PrivateRoute path = "/dashboard" component = {AccountInfo}/>
                            <PrivateRoute path = "/enquiry" component = {QueryGoods}/>
                        </Switch>
                    </Content>
                </Layout>
            )
    }
}

export default AccountMainContentComponent;
