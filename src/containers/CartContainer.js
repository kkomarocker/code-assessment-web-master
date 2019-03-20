import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkout, removeItem, updateQty, updateCart } from "../actions";
import { getTotal, getCartProducts, getTax } from "../reducers";
import Cart from "../components/Cart";

const CartContainer = ({
  products,
  total,
  checkout,
  removeItem,
  updateQty,
  initialQty,
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
      onQtyUpdate={updateQty}
      onUpdateCart={updateCart}
      qty={initialQty}
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
  updateQty: PropTypes.func.isRequired,
  qtyChange: PropTypes.func.isRequired,
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
  { checkout, removeItem, updateQty, updateCart }
)(CartContainer);
