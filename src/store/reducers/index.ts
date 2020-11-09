import { combineReducers } from "redux";
import CovidReducer from "./covidReducer";

const RootReducer = combineReducers({
  covid: CovidReducer,
});

export default RootReducer;
