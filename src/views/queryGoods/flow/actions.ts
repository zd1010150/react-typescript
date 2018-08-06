import * as _ from 'lodash';
import { Dispatch } from "redux";
import { get, post } from "../../../store/http/httpAction";
import { 
    QUERYGOODS_ADD_TO_CART,
    QUERYGOODS_BY_PAGINATION,
    QUERYGOODS_DELETE_FROM_CART, 
    QUERYGOODS_DELETE_REFINE_BY,
    QUERYGOODS_MODIFY_QUANTITY, 
    QUERYGOODS_SET_GOODS,
     QUERYGOODS_SET_SEARCH_KEY, 
     QUERYGOODS_SET_SELECTED_TIME_RANGE, 
     QUERYGOODS_SET_SORTER,
     QUERYGOODS_SET_TOGGLE_BRAND,
     QUERYGOODS_SET_TOGGLE_BRAND_BATCH,
     QUERYGOODS_SET_TOGGLE_CATEGORY,
     QUERYGOODS_SET_TOGGLE_CATEGORY_BATCH
     } from "./actionTypes";
import {  IproductInCart, IproductQueryFormData, IproductToPost, IrefineBytypes} from "./types";

const setProducts = (products: any) => ({
  products,
  type: QUERYGOODS_SET_GOODS
});
const setSearchKey = (searchKey: string) => ({
    searchKey,
    type: QUERYGOODS_SET_SEARCH_KEY,
});
const setSelectedBrand = (id: string, isAdd: true) => ({
    id,
    isAdd,
    type: QUERYGOODS_SET_TOGGLE_BRAND
});
const setSelectedBrandBatch = (ids: number, isAdd: true) => ({
    ids,
    isAdd,
    type: QUERYGOODS_SET_TOGGLE_BRAND_BATCH
});
const setSelectedCategory = (id: string, isAdd: true) => ({
    id,
    isAdd,
    type: QUERYGOODS_SET_TOGGLE_CATEGORY
});
const setSelectedCategoryBatch = (ids: number[], isAdd: true) => ({
    ids,
    isAdd,
    type: QUERYGOODS_SET_TOGGLE_CATEGORY_BATCH
});
const setTimeRange = (from: string, to: string)=>({
    from,
    to,
    type: QUERYGOODS_SET_SELECTED_TIME_RANGE
});
const deleteRefineBy = (deleteType: IrefineBytypes) => ({
    deleteType,
    type: QUERYGOODS_DELETE_REFINE_BY,
});
const addToCart = (product: IproductInCart) => ({
    product,
    type: QUERYGOODS_ADD_TO_CART,
});
const deleteFromCart = (id: number) => ({
    id,
    type: QUERYGOODS_DELETE_FROM_CART,
});
// tslint:disable-next-line:variable-name
const setPagination = (page: number,  per_page: number, total: number) => ({
    page,
    per_page,
    total,
    type: QUERYGOODS_BY_PAGINATION,
});
const setSorter = (orderBy: string, sortBy: string) => ({
    orderBy,
    sortBy,
    type: QUERYGOODS_SET_SORTER
});
const modifyQuantityInCart = (id:number, quantity: number) => ({
    id,
    quantity,
    type: QUERYGOODS_MODIFY_QUANTITY,
})

  export const getGoodsData = (values: IproductQueryFormData) => (dispatch: Dispatch<any>): Promise<void> =>
  get('/distributor/distributor-products', values, dispatch).then(({ data }) => {
      if (data && data.meta) {
          debugger
          dispatch(setProducts(data.data))
          dispatch(setSorter(values.orderBy as string, values.sortedBy as string));
          const { total, per_page, current_page} = data.meta.pagination;
          dispatch(setPagination(current_page, per_page, total))
      }
  });
 export const enqueryGoods = (values: { items : IproductToPost[]}, successMessage: string, cb: () => void)=> (dispatch: Dispatch<any>): Promise<void> =>
 post('/distributor/distributor-enquiries', values, dispatch).then(({ data }) => {
     if (data && _.isFunction(cb)) {
         cb();
     }
 });

