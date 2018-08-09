import * as _ from "lodash";
import { Dispatch } from "redux";
import { IApplicationState } from 'store/types';
import { Ibrand } from "../../../store/global/types";
import { get, post } from "../../../store/http/httpAction";
import {
  QUERYGOODS_ADD_TO_CART,
  QUERYGOODS_BY_PAGINATION,
  QUERYGOODS_DELETE_FROM_CART,
  QUERYGOODS_DELETE_REFINE_BY,
  QUERYGOODS_MODIFY_QUANTITY,
  QUERYGOODS_RESET_ALL_BRANDS,
  QUERYGOODS_SET_BRANDS,
  QUERYGOODS_SET_CATEGORIES,
  QUERYGOODS_SET_CHECKED_BRANDS,
  QUERYGOODS_SET_CHECKED_CATEGORY,
  QUERYGOODS_SET_GOODS,
  QUERYGOODS_SET_SEARCH_KEY,
  QUERYGOODS_SET_SELECTED_TIME_RANGE,
  QUERYGOODS_SET_SORTER,
  QUERYGOODS_SET_TOGGLE_BRAND,
  QUERYGOODS_SET_TOGGLE_BRAND_BATCH,
  QUERYGOODS_SET_TOGGLE_CATEGORY,
  QUERYGOODS_SET_TOGGLE_CATEGORY_BATCH,
} from "./actionTypes";
import {
  IproductInCart,
  IproductQueryFormData,
  IproductToPost,
  IrefineBytypes
} from "./types";


export const setProducts = (products: any) => ({
  products,
  type: QUERYGOODS_SET_GOODS
});
export const setSearchKey = (searchKey: string) => ({
  searchKey,
  type: QUERYGOODS_SET_SEARCH_KEY
});
export const setSelectedBrand = (id: string, isAdd: boolean) => ({
  id,
  isAdd,
  type: QUERYGOODS_SET_TOGGLE_BRAND
});
export const setSelectedBrandBatch = (ids: number[], isAdd: boolean) => ({
  ids,
  isAdd,
  type: QUERYGOODS_SET_TOGGLE_BRAND_BATCH
});
export const setSelectedCategory = (id: string, isAdd: boolean) => ({
  id,
  isAdd,
  type: QUERYGOODS_SET_TOGGLE_CATEGORY
});
export const setSelectedCategoryBatch = (ids: number[], isAdd: boolean) => ({
  ids,
  isAdd,
  type: QUERYGOODS_SET_TOGGLE_CATEGORY_BATCH
});
export const setTimeRange = (from: string, to: string) => ({
  from,
  to,
  type: QUERYGOODS_SET_SELECTED_TIME_RANGE
});
export const deleteRefineBy = (deleteType: IrefineBytypes) => ({
  deleteType,
  type: QUERYGOODS_DELETE_REFINE_BY
});
export const addToCart = (product: IproductInCart) => ({
  product,
  type: QUERYGOODS_ADD_TO_CART
});
export const deleteFromCart = (id: number) => ({
  id,
  type: QUERYGOODS_DELETE_FROM_CART
});

export const setPagination = (
  page: number,
  // tslint:disable-next-line:variable-name
  per_page: number,
  total: number
) => ({
  page,
  per_page,
  total,
  type: QUERYGOODS_BY_PAGINATION
});
export const setSorter = (orderBy: string, sortedBy: string) => ({
  orderBy,
  sortedBy,
  type: QUERYGOODS_SET_SORTER
});
export const modifyQuantityInCart = (id: number, quantity: number) => ({
  id,
  quantity,
  type: QUERYGOODS_MODIFY_QUANTITY
});

const setBrands = (brands: any) => ({
  brands,
  type: QUERYGOODS_SET_BRANDS
});
const setCategories = (categories: any) => ({
  categories,
  type: QUERYGOODS_SET_CATEGORIES
});
const resetBrands = (brands: Ibrand[]) => ({
  brands,
  type: QUERYGOODS_RESET_ALL_BRANDS
})
export const setCheckedBrandIds = (ids: number[])=>({
  ids,
  type:QUERYGOODS_SET_CHECKED_BRANDS
})
export const setCheckedCategoryIds = (ids: number[])=>({
  ids,
  type:QUERYGOODS_SET_CHECKED_CATEGORY
})
export const getGoodsData = (values: IproductQueryFormData) => (
  dispatch: Dispatch<any>
): Promise<void> =>
  get("/distributor/distributor-products", values, dispatch).then(
    ({ data }) => {
      if (data && data.meta) {
        dispatch(setProducts(data.data));
        dispatch(
          setSorter(values.orderBy || '', values.sortedBy || '')
        );
        const { total, per_page, current_page } = data.meta.pagination;
        dispatch(setPagination(current_page, per_page, total));
      }
    }
  );
export const enqueryGoods = (
  values: { items: IproductToPost[] },
  cb: () => void
) => (dispatch: Dispatch<any>): Promise<void> =>
  post("/distributor/distributor-enquiries", values, dispatch ).then(
    ({ data }) => {
      if (data && _.isFunction(cb)) {
        cb();
      }
    }
  );
export const filterCategoryByBrand = (brandIds: number[]) => (
  dispatch: Dispatch<any>
): Promise<void> =>
  get(`/distributor/brand-filter-category`, {data: brandIds}, dispatch).then(
    ({ data }) => {
      debugger
      dispatch(setCategories((data && data.data) || []));
      }
  );
export const filterBrandsByCategory = (categoryIds: number[]) => (
  dispatch: Dispatch<any>
): Promise<void> =>
  get(`/distributor/category-filter-brand`, {data: categoryIds}, dispatch).then(
    ({ data }) => {
      let brands :any = [];
      if(data && data.data){
        const allResponsBrands = data.data.map((d:any)=>d.brand);
        brands = _.unionBy(allResponsBrands, 'id');
      }
      dispatch(setBrands(brands || []));
    }
  );
export const filterBrandsByEnglishName = (charater: string) => (
  dispatch: Dispatch<any>
): Promise<void> =>
  get(`/distributor/brands/by-name/${charater}`, {}, dispatch).then(
    ({ data }) => {
      dispatch(setBrands((data && data.data) || []));
    }
  );
export const filterBrandsByPinying = (charater: string) => (
  dispatch: Dispatch<any>
): Promise<void> =>
  get(`/distributor/brands/by-pinyin/${charater}`, {}, dispatch).then(
    ({ data }) => {
      dispatch(setBrands((data && data.data) || []));
    }
  );
  export const getAllBrands = () => (
    dispatch: Dispatch<any>,
    getState: () => {}
  ) =>{
    const state :IApplicationState = getState() as IApplicationState;
    debugger
    dispatch( resetBrands(state.global.settings.brands || []));
  }
    
