import immutable from "immutability-helper";
import { ActionWithPayload, CovidTest } from "../../utils/interface";
import { Action } from "redux";
import { errorState } from "../actions/mics";

export enum covidAction {
  SET_COVID = "SET_COVID",
  SET_COVIDS = "SET_COVIDS",
  UPDATE_COVID = "UPDATE_COVID",
  DELETE_COVID = "DELETE_COVID",
  SET_BILLBOARDS = "SET_BILLBOARDS",
}

const initialState = {
  covid: {
    isLoading: false as Boolean,
    error: {} as errorState,
    data: {} as CovidTest,
  },
  covids: {
    isLoading: false as Boolean,
    error: {} as errorState,
    data: [] as Array<CovidTest>,
  },
  billboards: {
    isLoading: false as Boolean,
    error: {} as errorState,
    data: [] as Array<CovidTest>,
  },
};

const CovidReducer = (
  state = initialState,
  action: ActionWithPayload<any> | ActionWithPayload<Array<any>>
) => {
  switch (action.type) {
    case covidAction.SET_COVID:
      return { ...state, covid: action.payload };
    case covidAction.SET_COVIDS:
      return { ...state, covids: action.payload };
    case covidAction.DELETE_COVID:
      return state.covid;
    case covidAction.SET_BILLBOARDS:
      return { ...state, billboards: action.payload };
    default:
      return state;
  }
};

export default CovidReducer;
