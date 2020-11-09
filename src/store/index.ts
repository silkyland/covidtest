import { createStore, compose, applyMiddleware } from "redux";
import RootReducer from "./reducers";
import thunk from "redux-thunk";
const loadingMiddleware = require("redux-loading-middleware");
const loadingReducer = require("redux-loading-middleware/loadingReducer");

const Store = createStore(
  loadingReducer,
  RootReducer,
  compose(applyMiddleware(thunk, loadingMiddleware))
);

export default Store;
