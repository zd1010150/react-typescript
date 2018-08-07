import * as _ from 'lodash';
import { SET_GLOBAL_SETTING } from '../../../../store/global/actionTypes';
import { Icategory  } from '../../../../store/global/types';
import { QUERYGOODS_SET_CATEGORIES } from '../actionTypes';

const mappingState = (state: Icategory[] = [], serverGlobalSettings: any): Icategory[] => {
    if(!_.isEmpty(serverGlobalSettings.distributor_category)){
        return serverGlobalSettings.distributor_category.map((b:any) => ({ id: b.id, name_zh: b.name_zh, name_en: name}))
    }else{
        return state;
    }
}
const mapData =  ( data: any): Icategory[] => {
    if(!_.isEmpty(data)){
        return data.map((c:any) => ({
            id: c.distributor_category.id,
            name_en: c.distributor_category.name,
            name_zh: c.distributor_category.name_zh,
        }));
    }else{
        return [];
    }
};
const categories = (state: Icategory[]= [], action:any) => {
    const { type, settings } = action;
    switch (type) {
        case SET_GLOBAL_SETTING:
            return mappingState(state, settings)
        case QUERYGOODS_SET_CATEGORIES:
            return mapData(action.categories)
        default:
            return state;
    }
}




export default categories;
