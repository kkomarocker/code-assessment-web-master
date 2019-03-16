import React from "react";
import PropTypes from "prop-types";

const Product = ({
  productId,
  price,
  inventory,
  title,
  hasProducts,
  onRemoveClicked
}) => (
  <div>
    {title} - &#36;{price}
    {inventory ? ` x ${inventory}` : null}
    {hasProducts ? (
      <button onClick={() => onRemoveClicked(productId)}>Remove Item</button>
    ) : null}
  </div>
);

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string,
  productId: PropTypes.number,
  hasProducts: PropTypes.bool,
  onRemoveClicked: PropTypes.func
};

export default Product;
