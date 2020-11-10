import { createStore, compose, applyMiddleware, Middleware } from "redux";
import RootReducer from "./reducers";
import thunk from "redux-thunk";
const loadingMiddleware = require("redux-loading-middleware");

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState: any = {
  loading: false,
  covid: {},
};

const middleware = [thunk];

const store = createStore(
  RootReducer,
  // initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
