import { ActionWithPayload, CovidTest } from "../../utils/interface";
import { errorState } from "../actions/mics";

export enum covidAction {
  SET_COVID = "SET_COVID",
  SET_COVIDS = "SET_COVIDS",
  UPDATE_COVID = "UPDATE_COVID",
  DELETE_COVID = "DELETE_COVID",
  SET_QUEQES = "SET_QUEQES",
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
  queqes: {
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
    case covidAction.SET_QUEQES:
      return { ...state, queqes: action.payload };
    default:
      return state;
  }
};

export default CovidReducer;
