import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";

const ProductItem = ({ product, onAddToCartClicked }) => (
  <div className="col-6 product-title-box">
    <Product
      title={product.productTitle}
      price={product.price}
      inventory={product.inventory}
    />
    <div className="product-inventory">
      {product.inventory ? `${product.inventory} remaining` : `0 remaining`}
    </div>
    <button
      className="btn btn-primary"
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? "" : "disabled"}
    >
      Add to Cart
    </button>
  </div>
);

ProductItem.propTypes = {
  product: PropTypes.shape({
    productTitle: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
};

export default ProductItem;
