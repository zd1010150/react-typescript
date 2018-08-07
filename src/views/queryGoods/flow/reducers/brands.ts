import * as _ from 'lodash';
import { SET_GLOBAL_SETTING } from '../../../../store/global/actionTypes';
import { Ibrand  } from '../../../../store/global/types';
import { QUERYGOODS_SET_BRANDS } from '../actionTypes';

const mappingState = (state: Ibrand[], serverGlobalSettings: any): Ibrand[] => {
    if(!_.isEmpty(serverGlobalSettings.brand)){
        return serverGlobalSettings.brand.map((b:any) => ({ id: b.id, name_zh: b.name_zh, name_en: name, url:  b.logo_url}))
    }else{
        return state;
    }
}
const mapData=( data: any): Ibrand[]  => {
    if(!_.isEmpty(data)){
        return data.map((b:any) => ({
            id: b.id,
            name_en: b.name,
            name_zh: b.name_zh,
            url: b.logo_url
        }))
    }else{
        return [];
    }
}
const brands = (state: Ibrand[]= [], action:any) => {
    const { type, settings } = action;
    switch (type) {
        case SET_GLOBAL_SETTING:
            return mappingState(state, settings)
        case QUERYGOODS_SET_BRANDS:
            return mapData(action.brands)
        default:
            return state;
    }
}
export default brands;
