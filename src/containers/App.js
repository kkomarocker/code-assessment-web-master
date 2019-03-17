import React from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import "../index.scss";

const App = () => (
  <div>
    <div className="main-title">Work & Co Store</div>
    <hr />
    <ProductsContainer />
    <hr />
    <CartContainer />
  </div>
);

export default App;
