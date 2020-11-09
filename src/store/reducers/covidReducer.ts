import {
  SET_TODOS,
  SET_TODO,
  DONE_DELETE,
  CovidAction,
} from "../actions/covid";
import immutable from "immutability-helper";
import { ActionWithPayload, CovidTest } from "../../utils/interface";
import { Action } from "redux";

const initialState = {
  covid: [] as Array<CovidTest>,
};

const CovidReducer = (
  state = initialState,
  action: ActionWithPayload<CovidTest> | ActionWithPayload<Array<CovidTest>>
) => {
  switch (action.type) {
    case SET_TODOS:
      return [...state.covid, action.payload];
    case SET_TODO:
      return state.covid;
    default:
      return state;
  }
};

export default CovidReducer;
