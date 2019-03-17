import React, { Component } from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import $ from "jquery";
import "../index.scss";

const App = () => (
  <div id="Main">
    <div className="main-title">Work & Co Store</div>
    <hr />
    <ProductsContainer />
    <hr />
    <CartContainer />
  </div>
);

// class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     // $(window).resize();
//   }

//   render() {
//     return (
//       <div id="Main">
//         <div className="main-title">Work & Co Store</div>
//         <hr />
//         <ProductsContainer />
//         <hr />
//         <CartContainer />
//       </div>
//     );
//   }
// }

export default App;
