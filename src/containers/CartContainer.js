import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkout, removeItem, updateQty, qtyChange } from "../actions";
import { getTotal, getCartProducts, getInitialQty, getTax } from "../reducers";
import Cart from "../components/Cart";

const CartContainer = ({
  products,
  total,
  checkout,
  removeItem,
  updateQty,
  qtyChange,
  initialQty,
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
      onQtyInput={qtyChange}
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
  initialQty: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  products: getCartProducts(state),
  total: getTotal(state),
  tax: getTax(state),
  initialQty: getInitialQty(state)
});

export default connect(
  mapStateToProps,
  { checkout, removeItem, updateQty, qtyChange }
)(CartContainer);
