
import { QUERYGOODS_ADD_TO_CART, QUERYGOODS_DELETE_FROM_CART, QUERYGOODS_MODIFY_QUANTITY} from '../actionTypes';
import { IproductInCart } from '../types';

const addToCart = (state: IproductInCart[] , product: IproductInCart) => {
  return [...state.filter((good: IproductInCart) => good.product_id !== product.product_id),product];
}
const deleteFromCart = (state: IproductInCart[] , id: number) => {
  return state.filter((good: IproductInCart) => good.product_id !== id);
}
const modifyQuantityCart = (state: IproductInCart[] , id: number, quantity: number ) => {
  return state.map((good: IproductInCart) => {
    if(good.product_id === id){
      return Object.assign({},good,{ quantity });
    }else{
      return good;
    }
  });
}

export const cart = (state: IproductInCart[] = [], action:any) => {
  switch (action.type) {
    case QUERYGOODS_ADD_TO_CART:
      return addToCart(state, action.product);
    case QUERYGOODS_DELETE_FROM_CART:
      return deleteFromCart(state, action.id);
    case QUERYGOODS_MODIFY_QUANTITY:
      return modifyQuantityCart(state , action.id, action.quantity);
    default:
      return state;
  }
};

