/*tslint:disable:ordered-imports*/
import * as React from 'react';
import {Switch} from 'react-router';
import {AccountInfo, QueryGoods} from '../../../views/index';
import {Layout} from 'antd';
import { LeftNav } from '../index';
import { PrivateRoute } from '../../ui/index';
import { PageTitle } from '../index';

const {Sider, Content} = Layout;
class AccountMainContentComponent extends React.Component <{}> {
    public render() {

            return (
                <Layout className="account-main-layout">
                    <Sider className="left-side-nav"><LeftNav/></Sider>
                    <Content className="account-main-content">
                        <PageTitle/>
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
