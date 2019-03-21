import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  checkout,
  removeItem,
  onDecrementQty,
  onIncrementQty,
  updateCart
} from "../actions";
import { getTotal, getCartProducts, getTax } from "../reducers";
import Cart from "../components/Cart";

const CartContainer = ({
  products,
  total,
  checkout,
  removeItem,
  onDecrementQty,
  onIncrementQty,
  updateCart,
  tax
}) => {
  return (
    <Cart
      products={products}
      total={total}
      tax={tax}
      onCheckoutClicked={() => checkout(products)}
      onRemoveClicked={removeItem}
      onDecrementQty={onDecrementQty}
      onIncrementQty={onIncrementQty}
      onUpdateCart={updateCart}
    />
  );
};

CartContainer.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      productTitle: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  checkout: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  onDecrementQty: PropTypes.func.isRequired,
  onIncrementQty: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  tax: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  products: getCartProducts(state),
  total: getTotal(state),
  tax: getTax(state)
});

export default connect(
  mapStateToProps,
  { checkout, removeItem, onDecrementQty, onIncrementQty, updateCart }
)(CartContainer);
