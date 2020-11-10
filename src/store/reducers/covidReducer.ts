import { covidAction } from "../actions/covid";
import immutable from "immutability-helper";
import { ActionWithPayload, CovidTest } from "../../utils/interface";
import { Action } from "redux";

const initialState = {
  covid: {} as CovidTest,
  covids: [] as Array<CovidTest>,
};

const CovidReducer = (
  state = initialState,
  action: ActionWithPayload<CovidTest> | ActionWithPayload<Array<CovidTest>>
) => {
  switch (action.type) {
    case covidAction.SET_COVID:
      return [...state.covids, action.payload];
    case covidAction.SET_COVIDS:
      return state.covid;
    case covidAction.DELETE_COVID:
      return state.covid;
    default:
      return state;
  }
};

export default CovidReducer;
