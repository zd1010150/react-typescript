import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { LANGUAGE } from "../../config/app.config";
import { IloginUser} from '../../store/global/types';
import { IApplicationState} from '../../store/types';


interface IuserNameProps{
    locale: LANGUAGE;
    account: IloginUser
}
const userNameComponent: React.SFC<IuserNameProps >= ({locale, account}) => {
    let name: string;
    if(_.isEmpty(account.lastName) || _.isEmpty(account.firstName)){
        name = '';
    } else {
        name= locale === LANGUAGE.ZH ? `${account.lastName} ${account.firstName}` : `${account.firstName} ${account.lastName}`;
    }

    return (
        <span> {name}</span>
    )
};
const mapStateToProps = (state: IApplicationState) =>  ({ locale: state.global.language, account: state.global.account });

export default connect(mapStateToProps)(userNameComponent);
