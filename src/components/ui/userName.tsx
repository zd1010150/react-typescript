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
    
    const name= locale === LANGUAGE.ZH ? `${account.lastName || ''} ${account.firstName || ''}` : `${account.firstName || ''} ${account.lastName || ''}`;
    

    return (
        <span> {name}</span>
    )
};
const mapStateToProps = (state: IApplicationState) =>  ({ locale: state.global.language, account: state.global.account });

export default connect(mapStateToProps)(userNameComponent);
