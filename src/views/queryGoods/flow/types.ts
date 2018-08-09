import { Ibrand, Icategory  } from '../../../store/global/types';
import { IpaginationParams } from '../../../store/types';

export interface IproductQuery{
    search: string,
    brand_ids: number[],
    category_ids: number[],
    timerange: {
        from: string,
        to: string
    }
}
export type IproductQueryFormData = IproductQuery & IpaginationParams;
export enum IrefineBytypes{
    category,
    brand,
    timeRange
}
export interface Ipallet{
    index: number,
    price: string,
}
export interface Iproduct{
    id: number,
    code: string,
    categories: number[] | Icategory[],
    online_time: string,
    product_name_zh: string,
    product_name_en: string,
    qty_per_pallet: number,
    wholesale_pallet: Ipallet[],
    img: string,
    brand_zh: string,
    brand_en: string,
}


export interface IproductToPost{
    product_id: number,
    quantity: number,
}
export type IproductInCart = Iproduct & IproductToPost;


export interface IenquryState {
    goodsPagination: IpaginationParams,
    goodsQuery: IproductQuery,
    goods: Iproduct[],
    cart: IproductToPost[],
    brands: Ibrand[],
    categories: Icategory[],
    checkedBrandIds: number[],
    checkedCategoryIds: number[]
}

