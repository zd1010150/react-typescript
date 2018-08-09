/*tslint:disable:ordered-imports*/
import * as React from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {InjectedIntlProps, injectIntl} from 'react-intl';
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../LeftSideNav.less';
import {NAV_URL_PAGE_MAPPING} from '../../../../config/app.config';

const cx = classNames.bind(styles);

interface InavState {
    openKeys: string[]
}

class Nav extends React.Component <RouteComponentProps<InavState> & InjectedIntlProps, {}> {
    public state = {
        openKeys: ['clientLists'],
    };

    public render() {
        const {intl} = this.props;
        const {formatMessage} = intl;
        const {SubMenu} = Menu;
        const navObj = Object.keys(NAV_URL_PAGE_MAPPING).map(key => (
            {
                id: NAV_URL_PAGE_MAPPING[key],
                url: key
            }));
        const menuEls = navObj.map((item, index) => (
            <Menu.Item key = {item.url} className = {cx('left-nav-item')}>
                <NavLink to = {item.url}>{formatMessage({id: item.id})}</NavLink>
            </Menu.Item>
        ));
        return (
            <div className="sidebar sidebar-main">
                <Menu mode = "inline"
                      inlineIndent = {30}
                      onOpenChange = {this.onOpenChange}
                      openKeys = {this.state.openKeys}
                      className = {classNames(cx('left-side-nav'), 'left-side-nav')}
                      defaultSelectedKeys = {[location.pathname]}
                      defaultOpenKeys = {["clientLists"]}
                      selectedKeys = {[location.pathname]}>
                    <SubMenu title = "My account" key="clientLists">
                        {
                            menuEls
                        }
                    </SubMenu>
                </Menu>
            </div>
        );
    }

    private onOpenChange = (openKeys: string[]) => {
        if (openKeys.length < 1) {
            return;
        }
        openKeys.shift();
        this.setState({
            openKeys,
        });
    }
}


export default withRouter(injectIntl(Nav));


