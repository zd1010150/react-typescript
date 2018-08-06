import * as _ from "lodash";
import { createSelector } from "reselect";
import { IApplicationState } from "../../../store/types";
import {IproductInCart } from "./types";

const getGlobalBrnads = (state: IApplicationState) =>
  state.global.settings.brands;
const getGlobalCategories = (state: IApplicationState) =>
  state.global.settings.categories;
const getAllGoods = (state: IApplicationState) => state.enquery.goods;

const getSelectedCategoryId = (state: IApplicationState) =>
  state.enquery.goodsQuery.category_ids;
const getSelectedBrandId = (state: IApplicationState) =>
  state.enquery.goodsQuery.brand_ids;

export const getGoodsDetail = createSelector(
  [getGlobalCategories, getAllGoods],
  (globalCategories, goods) => {
    return goods.map(good =>
      Object.assign({}, good, {
        categories: (good.categories as number[]).map(cId => {
          const category = (globalCategories || []).filter(c => c.id === cId);
          if (_.isEmpty(category)) {
            return {
              name_en: "",
              name_zh: ""
            };
          } else {
            return {
              name_en: category[0].name,
              name_zh: category[0].name_zh
            };
          }
        })
      })
    );
  }
);
export const getSelectedBrandDetail = createSelector(
    [getSelectedBrandId, getGlobalBrnads],
    (ids, brands)=>{
        return ids.map(id=>{
            const brand = (brands || []).filter(b => b.id === id);
            if(_.isEmpty(brand)){
                return {
                    id,
                    name_en: '',
                    name_zh: '',
                    url: '',
                }
            }else{
                return {
                    id,
                    name_en: brand[0].name,
                    name_zh: brand[0].name_zh,
                    url: brand[0].url,
              
                }
            }
        })
    }
)
export const getAllGoodsDetail = createSelector(
  [getAllGoods, getGlobalCategories],
  (goods, categories)=>{
      return goods.map(good=>{
        return Object.assign({}, good, {categories: (good.categories as number[]).map( id => {
          const category = (categories || []).filter(c => c.id === id);
          if (_.isEmpty(category)) {
            return {
              name_en: "",
              name_zh: ""
            };
          } else {
            return {
              name_en: category[0].name,
              name_zh: category[0].name_zh
            };
          }
        })
      });
  });
})
