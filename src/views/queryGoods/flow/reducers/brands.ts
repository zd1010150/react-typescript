import * as _ from "lodash";
import { SET_GLOBAL_SETTING } from "../../../../store/global/actionTypes";
import { Ibrand } from "../../../../store/global/types";
import {
  QUERYGOODS_DELETE_REFINE_BY,
  QUERYGOODS_RESET_ALL_BRANDS,
  QUERYGOODS_SET_BRANDS,
  QUERYGOODS_SET_CHECKED_BRANDS
} from "../actionTypes";
import { IrefineBytypes } from '../types';

const mappingState = (state: Ibrand[], serverGlobalSettings: any): Ibrand[] => {
  if (!_.isEmpty(serverGlobalSettings.brand)) {
    return serverGlobalSettings.brand.map((b: any) => ({
      id: b.id,
      name_en: b.name,
      name_zh: b.name_zh,
      url: b.logo_url
    }));
  } else {
    return state;
  }
};
const mapData = (data: any): Ibrand[] => {
  if (!_.isEmpty(data)) {
    return data.map((b: any) => ({
      id: b.id,
      name_en: b.name,
      name_zh: b.name_zh,
      url: b.logo_url
    }));
  } else {
    return [];
  }
};
const brands = (state: Ibrand[] = [], action: any) => {
  const { type, settings } = action;
  switch (type) {
    case SET_GLOBAL_SETTING:
      return mappingState(state, settings);
    case QUERYGOODS_SET_BRANDS:
      return mapData(action.brands);
    case QUERYGOODS_RESET_ALL_BRANDS:
      return action.brands;
    default:
      return state;
  }
};
const delteRefineBy = (state: number[],
  deleteType: IrefineBytypes
) => {
  debugger
  switch (deleteType) {
    case IrefineBytypes.brand:
      return [];
    default:
      return state;
  }
};
export const checkedBrandIds = (state: number[] =[], action: any) => {
  const { type } = action;
  switch (type) {
    case QUERYGOODS_SET_CHECKED_BRANDS:
      return action.ids;
    case QUERYGOODS_DELETE_REFINE_BY:
      return delteRefineBy(state, action.deleteType)
    default:
      return state;
  }
}
export default brands;
