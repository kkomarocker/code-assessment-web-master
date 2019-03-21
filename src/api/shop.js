/**
 * Mocking client-server processing
 */
// import _products from "./products.json";
import axios from "axios";

const TIMEOUT = 100;

export default {
  getProducts: () =>
    axios.get("http://tech.work.co/shopping-cart/products.json"),
  buyProducts: (payload, cb, timeout) =>
    setTimeout(() => cb(), timeout || TIMEOUT)
};
