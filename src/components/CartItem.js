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

    <div>
      <button className="btn btn-danger remove" onClick={onRemoveClicked}>
        Remove
      </button>
      <button value="-" onClick={e => onQtyUpdate(productId, e.target.value)}>
        -
      </button>
      <span>{qty}</span>
      <button value="+" onClick={e => onQtyUpdate(productId, e.target.value)}>
        +
      </button>
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
  qty: PropTypes.string,
  onRemoveClicked: PropTypes.func.isRequired
};

export default CartItem;
