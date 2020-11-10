import { combineReducers } from "redux";
import AppReducer from "./appReducer";
import CovidReducer from "./covidReducer";

const RootReducer = combineReducers({
  covid: CovidReducer,
  app: AppReducer,
});

export default RootReducer;
