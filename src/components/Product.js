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
  <div>
    {title} - &#36;{price}
    {inventory ? ` x ${inventory}` : null}
    {hasProducts ? (
      <span>
        <input type="text" onChange={e => onQtyInput(e.target.value)} />
      </span>
    ) : null}
    {hasProducts ? (
      <button onClick={() => onQtyUpdate(productId)}>Update Qty</button>
    ) : null}
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
  onRemoveClicked: PropTypes.func,
  onQtyUpdate: PropTypes.func,
  onQtyInput: PropTypes.func,
  qty: PropTypes.string
};

export default Product;
