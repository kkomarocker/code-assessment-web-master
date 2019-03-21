import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";

const CartItem = ({
  productId,
  inventory,
  onRemoveClicked,
  onDecrementQty,
  onIncrementQty,
  title,
  price,
  quantity
}) => (
  <div className="col-6 product-title-box">
    <Product title={title} price={price} />

    <div className="d-flex justify-content-between align-items-end attr-box">
      <button
        className="btn btn-danger remove"
        onClick={() => onRemoveClicked(productId)}
      >
        Remove
      </button>
      <div>
        <button
          className="minus-btn"
          value="-"
          onClick={() => onDecrementQty(productId)}
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="qty-box">{quantity}</span>
        <button
          className="plus-btn"
          value="+"
          onClick={() => onIncrementQty(productId)}
          disabled={inventory === 0}
        >
          +
        </button>
      </div>
    </div>
    <div />
  </div>
);

CartItem.propTypes = {
  productId: PropTypes.number,
  title: PropTypes.string,
  inventory: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  onDecrementQty: PropTypes.func,
  onIncrementQty: PropTypes.func,
  onRemoveClicked: PropTypes.func.isRequired
};

export default CartItem;
