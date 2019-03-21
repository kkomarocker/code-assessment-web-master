import React from "react";
import PropTypes from "prop-types";

const Product = ({ price, title }) => (
  <div className="product-title-container">
    <div className="product-title">{title}</div>
    <div className="product-price"> &#36;{price}</div>
  </div>
);

Product.propTypes = {
  price: PropTypes.number,
  title: PropTypes.string
};

export default Product;
