import { combineReducers } from 'redux';
import brands from './brands';
import { cart } from './cart';
import categories from './categories';
import { goods, goodsPagination,goodsQuery} from './goods';


export default combineReducers({ brands, categories, goodsPagination, goodsQuery,goods, cart });
