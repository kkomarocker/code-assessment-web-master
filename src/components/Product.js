import React from "react";
import PropTypes from "prop-types";

const Product = ({
  productId,
  price,
  inventory,
  title,
  hasProducts,
  onRemoveClicked,
  onQtyUpdate,
  qty,
  onQtyInput
}) => (
  <div className="product-title-container">
    <div className="product-title">{title}</div>
    <div className="product-price"> &#36;{price}</div>
  </div>
);

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string,
  productId: PropTypes.number,
  hasProducts: PropTypes.bool,
  onRemoveClicked: PropTypes.func,
  onQtyUpdate: PropTypes.func,
  onQtyInput: PropTypes.func,
  qty: PropTypes.string
};

export default Product;
