import { ActionWithPayload, CovidTest } from "../../utils/interface";
import { errorState, loadingState } from "../actions/mics";

const initialState = {
  error: {},
  loading: false,
};

const AppReducer = (
  state = initialState,
  action: ActionWithPayload<any> | ActionWithPayload<any>
) => {
  switch (action.type) {
    case errorState.HAS_ERROR:
      return { ...state, error: action.payload };
    case errorState.HAS_NOT_ERROR:
      return { ...state, error: {} };
    case loadingState.IS_LOADING:
      return { ...state, loading: action.payload };
    case loadingState.IS_NOT_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default AppReducer;
