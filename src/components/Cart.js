import React from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";

const Cart = ({
  products,
  total,
  onCheckoutClicked,
  onRemoveClicked,
  onDecrementQty,
  onIncrementQty,
  onUpdateCart,
  tax
}) => {
  const hasProducts = products.length > 0;
  const nodes = hasProducts ? (
    products.map(product => (
      <div
        key={`${product.id}-${product.productTitle}`}
        className="row product-container"
      >
        <img src={product.src} className="col-4" alt="" />
        <CartItem
          productId={product.id}
          title={product.productTitle}
          price={product.price}
          quantity={product.quantity}
          image={product.src}
          inventory={product.inventory}
          onRemoveClicked={onRemoveClicked}
          onDecrementQty={onDecrementQty}
          onIncrementQty={onIncrementQty}
        />
        <hr />
      </div>
    ))
  ) : (
    <div className="empty-msg d-flex justify-content-center align-items-center flex-column">
      <i className="fa fa-shopping-cart fa-5x" aria-hidden="true" />
      <p>Please add some products to your cart.</p>
    </div>
  );

  return (
    <div>
      <h3>Your Cart</h3>
      <div style={{ background: "white" }}>
        {nodes}
        <div className="d-flex flex-column price-container">
          <div className="row price-box">
            <span className="col-9">Total: </span>
            <span className="col-3">&#36;{total.toFixed(2)}</span>
          </div>
          <hr />
          <div className="row price-box">
            <span className="col-9">Tax:</span>
            <span className="col-3">&#36;{tax.toFixed(2)}</span>
          </div>
          <hr />
          <div className="row price-box">
            <span className="col-9">Grand Total:</span>
            <span className="col-3">&#36;{(total + tax).toFixed(2)}</span>
          </div>
          <hr />
        </div>
        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={() => onUpdateCart()}
          style={{ borderRadius: "0", fontSize: "1.5rem" }}
        >
          Update Cart
        </button>
        <button
          className="btn btn-success btn-lg btn-block"
          style={{ borderRadius: "0", fontSize: "1.5rem" }}
          onClick={onCheckoutClicked}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.number,
  tax: PropTypes.number,
  onCheckoutClicked: PropTypes.func,
  onRemoveClicked: PropTypes.func,
  onDecrementQty: PropTypes.func,
  onIncrementQty: PropTypes.func
};

export default Cart;
