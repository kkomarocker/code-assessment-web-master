import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";

const CartItem = ({
  product,
  onRemoveClicked,
  onQtyUpdate,
  onQtyInput,
  qty,
  title,
  price
}) => (
  <div className="col-7">
    <Product
      title={title}
      price={price}
      // inventory={product.inventory}
    />
    <button className="btn btn-danger remove" onClick={onRemoveClicked}>
      Remove
    </button>
    <div />
  </div>
);

CartItem.propTypes = {
  product: PropTypes.shape({
    productTitle: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onRemoveClicked: PropTypes.func.isRequired
};

export default CartItem;
