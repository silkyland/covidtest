import axios from "axios";
import { Dispatch } from "redux";
import { CovidTest, ErrorMessage, Subscriber } from "../../utils/interface";

export enum loadingState {
  IS_NOT_LOADING = "IS_NOT_LOADING",
  IS_LOADING = "IS_LOADING",
}

export enum errorState {
  HAS_NOT_ERROR = "HAS_NOT_ERROR",
  HAS_ERROR = "HAS_ERROR",
}

export const setLoadingState = (type: loadingState, state: Boolean) => ({
  type: type,
  payload: state,
});

export const setErrorState = (state: errorState, message: ErrorMessage) => ({
  type: state,
  payload: message,
});
