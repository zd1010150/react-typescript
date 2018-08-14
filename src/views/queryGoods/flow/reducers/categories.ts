import * as _ from 'lodash';
import { SET_GLOBAL_SETTING } from '../../../../store/global/actionTypes';
import { Icategory  } from '../../../../store/global/types';
import { 
    QUERYGOODS_DELETE_REFINE_BY,
    QUERYGOODS_RESET_ALL_CATEGORIES, 
    QUERYGOODS_SET_CATEGORIES, 
    QUERYGOODS_SET_CHECKED_CATEGORY 
} from '../actionTypes';
import { IrefineBytypes } from '../types';

const mappingState = (state: Icategory[] = [], serverGlobalSettings: any): Icategory[] => {
    if(!_.isEmpty(serverGlobalSettings.distributor_category)){
        return serverGlobalSettings.distributor_category.map((b:any) => ({ id: b.id, name_zh: b.name_zh, name_en: b.name}))
    }else{
        return state;
    }
}
const mapData =  ( data: any): Icategory[] => {
    if(!_.isEmpty(data)){
        return data.map((c:any) => ({
            id: c.id,
            name_en: c.name,
            name_zh: c.name_zh,
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
            case QUERYGOODS_RESET_ALL_CATEGORIES:
            return action.categories
        default:
            return state;
    }
}
const delteRefineBy = (state: number[],
    deleteType: IrefineBytypes
  ) => {
    switch (deleteType) {
      case IrefineBytypes.category:
        return [];
      default:
        return state;
    }
  };
export const checkedCategoryIds = (state: number[] =[], action: any) => {
    const { type } = action;
    switch (type) {
      case QUERYGOODS_SET_CHECKED_CATEGORY:
        return action.ids;
      case QUERYGOODS_DELETE_REFINE_BY:
        return delteRefineBy(state, action.deleteType)
      default:
        return state;
    }
  }



export default categories;
