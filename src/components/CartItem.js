import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";

const CartItem = ({
  productId,
  onRemoveClicked,
  onQtyUpdate,
  onQtyInput,
  qty,
  title,
  price
}) => (
  <div className="col-7">
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
          onClick={e => onQtyUpdate(productId, e.target.value)}
        >
          -
        </button>
        <span className="qty-box">{qty}</span>
        <button
          className="plus-btn"
          value="+"
          onClick={e => onQtyUpdate(productId, e.target.value)}
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
  price: PropTypes.number,
  quantity: PropTypes.number,
  image: PropTypes.string,
  onQtyUpdate: PropTypes.func,
  qty: PropTypes.number,
  onRemoveClicked: PropTypes.func.isRequired
};

export default CartItem;
