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

const cartUpdated = updatedProducts => dispatch => {
  dispatch({ type: types.UPDATE_CART, updatedProducts });
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

    data.map((item, i) => {
      item.price = item.price.value;
      item.src = imgArr[i];
      item.inCart = 0;
      item.isMinusClicked = false;
    });

    dispatch(receiveProducts(data));
  } catch (e) {
    throw new Error(e);
  }
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

export const updateQty = (productId, textVal) => (dispatch, getState) => {
  const { quantityById } = getState().cart;
  const { byId } = getState().products;

  if (textVal === "+") {
    quantityById[productId]++;
    byId[productId].inCart++;
    byId[productId].isMinusClicked = false;
  } else {
    if (quantityById[productId] > 1) {
      quantityById[productId]--;
      byId[productId].inCart--;
      byId[productId].isMinusClicked = true;
    } else {
      byId[productId].inventory = 0;
    }
  }

  dispatch(itemQtyUpdated(quantityById));
};

export const updateCart = products => (dispatch, getState) => {
  const { byId } = getState().products;
  const { quantityById } = getState().cart;

  products.forEach(product => {
    let productId = product.id;

    if (byId.hasOwnProperty(productId)) {
      if (byId[productId].isMinusClicked) {
        byId[productId].inventory += quantityById[productId];
      } else {
        if (byId[productId].inventory === quantityById[productId]) {
          byId[productId].inventory -= quantityById[productId];
        } else {
          byId[productId].inventory -= quantityById[productId] - 1;
        }
      }
    }
  });

  dispatch(cartUpdated(byId));
};
