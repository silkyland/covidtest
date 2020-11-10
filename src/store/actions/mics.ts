import axios from "axios";
import { Dispatch } from "redux";
import { CovidTest } from "../../utils/interface";

export enum loadingState {
  IS_NOT_LOADING = 0,
  IS_LOADING = 1,
}

export enum errorState {
  HAS_NOT_ERROR = 0,
  HAS_ERROR = 1,
}

interface errorMessage {
  message: string;
  code: number;
  trace: string;
}

export const setLoadingState = (type: loadingState, state: Boolean) => ({
  type: type,
  payload: state,
});

export const setErrorState = (state: errorState, message: errorMessage) => ({
  type: state,
  payload: message,
});
