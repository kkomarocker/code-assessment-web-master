import React from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../index.scss";

const App = () => (
  <Router>
    <div id="Main" className="container">
      <div className="row d-flex justify-content-between title-box">
        <div className="main-title">Work & Co Store</div>
        <div>
          <span className="to-cart">
            <i className="fa fa-shopping-cart" style={{ margin: "0 10px" }} />
            <Link to="/cart">Cart</Link>
          </span>
        </div>
      </div>

      <hr />
      <Route exact path="/" component={ProductsContainer} />
      <Route path="/cart" component={CartContainer} />
    </div>
  </Router>
);

export default App;
