import { combineReducers } from 'redux';
import brands, { checkedBrandIds } from './brands';
import { cart } from './cart';
import categories, { checkedCategoryIds } from './categories';
import { goods, goodsPagination,goodsQuery} from './goods';


export default combineReducers({ brands, categories, goodsPagination, goodsQuery,goods, cart, checkedBrandIds, checkedCategoryIds });
