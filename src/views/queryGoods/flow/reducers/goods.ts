import * as _ from 'lodash';
import { IpaginationParams } from "../../../../store/types";
import {
  QUERYGOODS_BY_PAGINATION,
  QUERYGOODS_DELETE_REFINE_BY,
  QUERYGOODS_SET_GOODS,
  QUERYGOODS_SET_SEARCH_KEY,
  QUERYGOODS_SET_SELECTED_TIME_RANGE,
  QUERYGOODS_SET_SORTER,
  QUERYGOODS_SET_TOGGLE_BRAND,
  QUERYGOODS_SET_TOGGLE_BRAND_BATCH,
  QUERYGOODS_SET_TOGGLE_CATEGORY,
  QUERYGOODS_SET_TOGGLE_CATEGORY_BATCH
} from "../actionTypes";
import { Iproduct, IproductQuery, IrefineBytypes } from "../types";

const initPagination: IpaginationParams = {
  orderBy: "",
  page: 1,
  per_page: 50,
  sortedBy: "",
  total: 0
};

export const goodsPagination = (
  state: IpaginationParams = initPagination,
  action: any
) => {
  switch (action.type) {
    case QUERYGOODS_BY_PAGINATION:
      return Object.assign({}, state, {
        page: action.page,
        per_page: action.per_page,
        total: action.total
      });
    case QUERYGOODS_SET_SORTER:
      return Object.assign({}, state, {
        orderBy: action.orderBy,
        sortedBy: action.sortedBy
      });
    default:
      return state;
  }
};
const delteRefineBy = (
  state: IproductQuery = initQuery,
  deleteType: IrefineBytypes
) => {
  switch (deleteType) {
    case IrefineBytypes.timeRange:
      return Object.assign({}, state, {
        timerange: {
          from: "",
          to: ""
        }
      });
    case IrefineBytypes.brand:
      return Object.assign({}, state, { brand_ids: [] });
    case IrefineBytypes.category:
      return Object.assign({}, state, { category_ids: [] });
    default:
      return state;
  }
};
const toggleBrands = (
  state: IproductQuery = initQuery,
  id: number,
  isAdd: boolean
) => {
  if (isAdd) {
    return Object.assign({}, state, {
      brand_ids: [...state.brand_ids, id]
    });
  } else {
    const brands = state.brand_ids.filter(i => i !== id);
    return Object.assign({}, state, {
      brand_ids: [...brands]
    });
  }
};
const batchToggleBrands = (
  state: IproductQuery = initQuery,
  ids: number[],
  isAdd: boolean
) => {
  if (isAdd) {
    return Object.assign({}, state, {
      brand_ids: ids
    });
  } else {
    const brands = state.brand_ids.filter(i => ids.indexOf(i) < 0);
    return Object.assign({}, state, {
      brand_ids: [...brands]
    });
  }
};
const toggleCategory = (
  state: IproductQuery = initQuery,
  id: number,
  isAdd: boolean
) => {
  if (isAdd) {
    return Object.assign({}, state, {
      category_ids: [...state.category_ids, id]
    });
  } else {
    const categories = state.category_ids.filter(i => i !== id);
    return Object.assign({}, state, {
      category_ids: [...categories]
    });
  }
};
const batchToggleCategory = (
  state: IproductQuery = initQuery,
  ids: number[],
  isAdd: boolean
) => {
  if (isAdd) {
    
    return Object.assign({}, state, {
      category_ids: ids
    });
  } else {
    const categories = state.category_ids.filter(i => ids.indexOf(i) < 0);
    return Object.assign({}, state, {
      category_ids: [...categories]
    });
  }
};
const initQuery: IproductQuery = {
  brand_ids: [],
  category_ids: [],
  search: "",
  timerange: {
    from: "",
    to: ""
  }
};
export const goodsQuery = (state: IproductQuery = initQuery, action: any) => {
  const { type } = action;
  switch (type) {
    case QUERYGOODS_DELETE_REFINE_BY:
      return delteRefineBy(state, action.deleteType);
    case QUERYGOODS_SET_SEARCH_KEY:
      return Object.assign({}, state, { search: action.searchKey });
    case QUERYGOODS_SET_SELECTED_TIME_RANGE:
      return Object.assign({}, state, {
        timerange: { from: action.from, to: action.to }
      });
    case QUERYGOODS_SET_TOGGLE_BRAND_BATCH:
      return batchToggleBrands(state, action.ids, action.isAdd);
    case QUERYGOODS_SET_TOGGLE_BRAND:
      return toggleBrands(state, action.id, action.isAdd);
    case QUERYGOODS_SET_TOGGLE_CATEGORY:
      return toggleCategory(state, action.id, action.isAdd);
    case QUERYGOODS_SET_TOGGLE_CATEGORY_BATCH:
      return batchToggleCategory(state, action.ids, action.isAdd);
    default:
      return state;
  }
};
const mappingGoods = (state: Iproduct[] = [], data: any) => {
  return data.map((good: any) => ({
    id: good.product_id,
    // tslint:disable-next-line:object-literal-sort-keys
    code: good.product_code,
    categories: _.isEmpty(good.categories) ? [] : good.categories.map((c: any) => c.distributor_category_id),
    online_time: good.online_time,
    product_name_zh: good.name,
    product_name_en: good.name_en,
    qty_per_pallet: good.qty_per_pallet,
    wholesale_pallet: _.isEmpty(good.wholesale_pallet) ? [] : good.wholesale_pallet.map((p: any) => ({
      index: p.pallets,
      price: p.price
    })),
    img: good.image_url,
    brand_zh: (good.brand && good.brand.name_zh) || '',
    brand_en: (good.brand && good.brand.name) || ''
  }));
};
export const goods = (state: Iproduct[] = [], action: any) => {
  const { type } = action;
  switch (type) {
    case QUERYGOODS_SET_GOODS:
      return mappingGoods(state, action.products);
    default:
      return state;
  }
};
