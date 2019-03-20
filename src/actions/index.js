import shop from "../api/shop";
import * as types from "../constants/ActionTypes";
import axios from "axios";

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
});

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
});

const itemRemovedFromCart = (list, qtyObj) => ({
  type: types.REMOVE_PRODUCT,
  list,
  qtyObj
});

const inputQty = qty => dispatch => {
  dispatch({ type: types.INPUT_QTY, qty });
};

const itemQtyUpdated = newQty => dispatch => {
  dispatch({ type: types.UPDATE_QTY, newQty });
};

const cartUpdated = updatedProducts => dispatch => {
  dispatch({ type: types.UPDATE_CART, updatedProducts });
};

export const getAllProducts = () => async dispatch => {
  const url = "http://tech.work.co/shopping-cart/products.json";
  const { data } = await axios.get(url);

  // loading product images not working for some reason..
  const imgArr = [
    "/assets/chronograph.jpg",
    "/assets/quartz.jpg",
    "/assets/weekender.jpg"
  ];

  data.map(item => (item.price = item.price.value));
  data.map((item, i) => (item.src = imgArr[i]));
  data.map(item => (item.inCart = 0));

  dispatch(receiveProducts(data));
};

export const addToCart = productId => (dispatch, getState) => {
  const { byId } = getState().products;

  if (byId[productId].inventory > 0) {
    byId[productId].inCart++;
    dispatch(addToCartUnsafe(productId));
  }
};

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState();
  const { byId } = getState().products;

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

  products.forEach(product => {
    if (byId.hasOwnProperty(product.id)) {
      byId[product.id].inCart = 0;
    }
  });
};

export const removeItem = productId => (dispatch, getState) => {
  const { addedIds, quantityById } = getState().cart;
  const { byId } = getState().products;

  byId[productId].inventory += quantityById[productId];
  byId[productId].inCart = 0;
  quantityById[productId] = 0;

  const newIdList =
    quantityById[productId] === 0
      ? addedIds.filter(id => id !== productId)
      : addedIds;

  dispatch(itemRemovedFromCart(newIdList, quantityById));
};

export const qtyChange = qty => dispatch => {
  dispatch(inputQty(qty));
};

export const updateQty = (productId, textVal) => (dispatch, getState) => {
  const { initialQty } = getState().cart;
  const { byId } = getState().products;
  let intQty = parseInt(initialQty);

  if (textVal === "+") {
    intQty++;
    byId[productId].inCart++;
  } else {
    if (byId[productId].inCart > 1) {
      intQty--;
      byId[productId].inCart--;
    }
  }

  dispatch(itemQtyUpdated(intQty));
};

export const updateCart = products => (dispatch, getState) => {
  const { byId } = getState().products;
  const { quantityById } = getState().cart;

  products.forEach(product => {
    if (byId.hasOwnProperty(product.id)) {
      if (product.inCart < product.inventory) {
        byId[product.id].inventory -= product.inCart;
      } else {
        byId[product.id].inventory = 0;
      }
    }

    if (quantityById.hasOwnProperty(product.id)) {
      quantityById[product.id] = product.inCart;
    }
  });

  dispatch(cartUpdated(byId));
};
