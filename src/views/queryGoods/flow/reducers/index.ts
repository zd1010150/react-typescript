import { combineReducers } from 'redux';
import { cart } from './cart';
import { goods, goodsPagination,goodsQuery} from './goods';



export default combineReducers({ goodsPagination, goodsQuery,goods, cart });
