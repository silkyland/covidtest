import { combineReducers } from "redux";
import AppReducer from "./appReducer";
import CovidReducer from "./covidReducer";
import { PersonalReducer } from "./personalReducer";

const RootReducer = combineReducers({
  covid: CovidReducer,
  app: AppReducer,
  personal: PersonalReducer,
});

export default RootReducer;
