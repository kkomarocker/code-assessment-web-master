import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";

const CartItem = ({
  productId,
  inventory,
  onRemoveClicked,
  onQtyUpdate,
  title,
  price,
  inCart
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
          disabled={inCart === 1}
        >
          -
        </button>
        <span className="qty-box">{inCart}</span>
        <button
          className="plus-btn"
          value="+"
          onClick={e => onQtyUpdate(productId, e.target.value)}
          disabled={inCart > inventory}
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
  onQtyUpdate: PropTypes.func,
  onRemoveClicked: PropTypes.func.isRequired
};

export default CartItem;
