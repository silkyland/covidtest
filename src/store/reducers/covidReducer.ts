import { ActionWithPayload, CovidTest } from "../../utils/interface";
import { errorState } from "../actions/mics";

export enum covidAction {
  SET_COVID = "SET_COVID",
  ADD_COVID = "ADD_COVID",
  ADD_QUEQE = "ADD_QUEQE",
  ADD_RAPID = "ADD_RAPID",
  ADD_PCR = "ADD_PCR",
  ADD_BILLBOARD = "ADD_BILLBOARD",
  SET_COVIDS = "SET_COVIDS",
  UPDATE_COVID = "UPDATE_COVID",
  DELETE_COVID = "DELETE_COVID",
  SET_QUEQES = "SET_QUEQES",
  SET_RAPIDS = "SET_RAPIDS",
  SET_PCRS = "SET_PCRS",
  SET_BILLBOARDS = "SET_BILLBOARDS",
}

const initialState = {
  covid: {
    isLoading: false as Boolean,
    error: {} as errorState,
    data: {} as CovidTest,
  },
  rapids: {
    isLoading: false as Boolean,
    error: {} as errorState,
    data: [] as Array<CovidTest>,
  },
  pcrs: {
    isLoading: false as Boolean,
    error: {} as errorState,
    data: [] as Array<CovidTest>,
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
    case covidAction.ADD_QUEQE:
      return {
        ...state,
        queqes: {
          data: state.queqes.data
            .concat(action.payload.data)
            .sort((a, b) => b.queqe_id - a.queqe_id),
          error: action.payload.error,
          isLoading: action.payload.isLoading,
        },
      };
    case covidAction.ADD_RAPID:
      const findIndex = state.rapids.data.findIndex(
        (p: CovidTest) => p.citizen_id === action.payload.data.citizen_id
      );

      console.log(findIndex);

      if (findIndex >= 0) {
        const updateData = [...state.rapids.data];
        updateData[findIndex] = action.payload.data;
        return {
          ...state,
          rapids: {
            data: updateData,
            error: action.payload.error,
            isLoading: action.payload.isLoading,
          },
        };
      } else {
        return {
          ...state,
          rapids: {
            data: [action.payload.data, ...state.rapids.data],
            error: action.payload.error,
            isLoading: action.payload.isLoading,
          },
        };
      }
    case covidAction.ADD_PCR:
      const index = state.pcrs.data.findIndex(
        (p: CovidTest, index: number) =>
          p.citizen_id === action.payload.data.citizen_id
      );

      console.log(index);

      if (index >= 0) {
        const updateData = [...state.pcrs.data];
        updateData[index] = action.payload.data;
        return {
          ...state,
          pcrs: {
            data: updateData,
            error: action.payload.error,
            isLoading: action.payload.isLoading,
          },
        };
      } else {
        return {
          ...state,
          pcrs: {
            data: [action.payload.data, ...state.pcrs.data],
            error: action.payload.error,
            isLoading: action.payload.isLoading,
          },
        };
      }
    case covidAction.SET_COVIDS:
      return { ...state, covids: action.payload };
    case covidAction.DELETE_COVID:
      return state.covid;
    case covidAction.SET_QUEQES:
      return { ...state, queqes: action.payload };
    case covidAction.SET_RAPIDS:
      return { ...state, rapids: action.payload };
    case covidAction.SET_PCRS:
      return { ...state, pcrs: action.payload };
    case covidAction.SET_BILLBOARDS:
      return { ...state, billboards: action.payload };
    default:
      return state;
  }
};

export default CovidReducer;
