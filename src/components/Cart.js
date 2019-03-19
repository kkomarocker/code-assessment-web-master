import React from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";

const Cart = ({
  products,
  total,
  onCheckoutClicked,
  onRemoveClicked,
  onQtyUpdate,
  onQtyInput,
  qty,
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
          price={product.price * product.inCart}
          quantity={product.quantity}
          image={product.src}
          onRemoveClicked={onRemoveClicked}
          onQtyUpdate={onQtyUpdate}
          qty={qty}
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
        <p>Total: &#36;{total}</p>
        <p>Tax: &#36;{tax}</p>
      </div>

      <button onClick={onCheckoutClicked}>Checkout</button>
    </div>
  );
};

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  tax: PropTypes.number,
  onCheckoutClicked: PropTypes.func,
  onRemoveClicked: PropTypes.func,
  onQtyUpdate: PropTypes.func,
  onQtyInput: PropTypes.func,
  qty: PropTypes.number
};

export default Cart;
