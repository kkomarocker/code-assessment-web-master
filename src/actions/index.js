import shop from "../api/shop";
import * as types from "../constants/ActionTypes";
import axios from "axios";

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
});

export const getAllProducts = () => async dispatch => {
  const url = "http://tech.work.co/shopping-cart/products.json";
  const { data } = await axios.get(url);
  data.map(item => (item.price = item.price.value));
  dispatch(receiveProducts(data));
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

const itemRemovedFromCart = (list, qtyObj) => ({
  type: types.REMOVE_PRODUCT,
  list,
  qtyObj
});

export const removeItem = productId => (dispatch, getState) => {
  const { addedIds, quantityById } = getState().cart;
  const { byId } = getState().products;

  if (quantityById[productId]) {
    quantityById[productId] -= 1;
  }

  const newIdList =
    quantityById[productId] === 0
      ? addedIds.filter(id => id !== productId)
      : addedIds;

  if (byId.hasOwnProperty(productId)) {
    byId[productId].inventory += 1;
  }

  dispatch(itemRemovedFromCart(newIdList, quantityById));
};

const inputQty = qty => dispatch => {
  dispatch({ type: types.INPUT_QTY, qty });
};

export const qtyInput = qty => dispatch => {
  dispatch(inputQty(qty));
};

const itemQtyUpdated = qtyObj => dispatch => {
  dispatch({ type: types.UPDATE_QTY, qtyObj });
};

export const updateQty = productId => (dispatch, getState) => {
  const { qtyInput, quantityById } = getState().cart;
  const { byId } = getState().products;
  const intQty = parseInt(qtyInput);

  if (quantityById[productId] && byId[productId].inventory) {
    if (byId[productId].inventory >= intQty) {
      quantityById[productId] += intQty;
      byId[productId].inventory -= intQty;
    }
  }

  dispatch(itemQtyUpdated(quantityById));
};
