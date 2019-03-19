import {
  ADD_TO_CART,
  REMOVE_PRODUCT,
  UPDATE_QTY,
  INPUT_QTY,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from "../constants/ActionTypes";

const initialState = {
  addedIds: [],
  quantityById: {},
  setQty: "1"
};

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state;
      }
      return [...state, action.productId];
    case REMOVE_PRODUCT:
      return action.list;
    default:
      return state;
  }
};

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action;
      return { ...state, [productId]: (state[productId] || 0) + 1 };
    case REMOVE_PRODUCT:
      return action.qtyObj;
    case UPDATE_QTY:
      return action.qtyObj;
    default:
      return state;
  }
};

const setQty = (state = initialState.setQty, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return "1";
    default:
      return state;
  }
};

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0;

export const getAddedIds = state => state.addedIds;

export const getInitialQty = state => state;

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
        initialQty: setQty(state.setQty, action)
      };
  }
};

export default cart;
