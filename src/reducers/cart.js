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
  qty: ""
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
    default:
      return state;
  }
};

const qtyInput = (state = initialState.qty, action) => {
  switch (action.type) {
    case INPUT_QTY:
      const { qty } = action;
      return qty;
    default:
      return state;
  }
};

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0;

export const getAddedIds = state => state.addedIds;

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
        qtyInput: qtyInput(state.qty, action)
      };
  }
};

export default cart;
