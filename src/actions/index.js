import shop from "../api/shop";
import * as types from "../constants/ActionTypes";

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

const itemQtyUpdated = updateQtyObj => dispatch => {
  dispatch({ type: types.UPDATE_QTY, updateQtyObj });
};

export const getAllProducts = () => async dispatch => {
  try {
    const { data } = await shop.getProducts();

    // Hardcoded since the given api does not return images..
    const imgArr = [
      "/img/chronograph.jpg",
      "/img/quartz.jpg",
      "/img/weekender.jpg"
    ];

    const products = data.map((item, i) => {
      return {
        ...item,
        price: item.price.value,
        src: imgArr[i]
      };
    });

    dispatch(receiveProducts(products));
  } catch (e) {
    throw new Error(e);
  }
};

export const addToCart = productId => (dispatch, getState) => {
  const { byId } = getState().products;

  if (byId[productId].inventory > 0) {
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
  quantityById[productId] = 0;

  const newIdList =
    quantityById[productId] === 0
      ? addedIds.filter(id => id !== productId)
      : addedIds;

  dispatch(itemRemovedFromCart(newIdList, quantityById));
};

export const onDecrementQty = productId => (dispatch, getState) => {
  const { quantityById } = getState().cart;
  const { byId } = getState().products;

  if (byId[productId]) {
    byId[productId].inventory++;
    quantityById[productId]--;
  }

  dispatch(itemQtyUpdated(quantityById));
};

export const onIncrementQty = productId => (dispatch, getState) => {
  const { quantityById } = getState().cart;
  const { byId } = getState().products;

  if (byId[productId]) {
    byId[productId].inventory--;
    quantityById[productId]++;
  }

  dispatch(itemQtyUpdated(quantityById));
};

export const updateCart = () => () => {
  alert("Cart updated");
};
