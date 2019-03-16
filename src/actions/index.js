import shop from "../api/shop";
import * as types from "../constants/ActionTypes";

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
});

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products));
  });
};

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
});

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState();

  dispatch({
    type: types.CHECKOUT_REQUEST
  });
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    });
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  });
};

const itemRemovedFromCart = list => ({ type: types.REMOVE_PRODUCT, list });

const itemRestockedFromCart = qtyObj => ({
  type: types.REMOVE_PRODUCT,
  qtyObj
});

export const removeItem = productId => (dispatch, getState) => {
  const { addedIds, quantityById } = getState().cart;

  const newIdList = addedIds.filter(id => id !== productId);
  const newQuantityByIdObj = {
    ...quantityById,
    [productId]: (quantityById[productId] || 0) - 1
  };

  dispatch(itemRemovedFromCart(newIdList));
  dispatch(itemRestockedFromCart(newQuantityByIdObj));
};
