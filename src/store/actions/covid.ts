import axios from "axios";
import { AnyAction, Dispatch } from "redux";
import { CovidTest } from "../../utils/interface";
import { errorState, setErrorState } from "./mics";

export enum covidAction {
  SET_COVID = "SET_COVID",
  SET_COVIDS = "SET_COVIDS",
  DELETE_COVID = "DELETE_COVID",
}

export const scan = (citizen_id: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const reponse = await axios.get(
      `https://jsonplaceholder.typicode.com/todos`
    );
    dispatch(setCovids(reponse.data));
  } catch (error: any) {
    dispatch(
      setErrorState(errorState.HAS_ERROR, {
        code: error.reponse.status,
        message: error.message,
        trace: JSON.stringify(error.response),
      })
    );
  }
};

export const deleteCovid = (id: string) => ({
  type: covidAction.DELETE_COVID,
  payload: id,
});

export const setCovid = (data: CovidTest) => ({
  type: covidAction.SET_COVID,
  payload: data,
});

export const setCovids = (data: CovidTest) => ({
  type: covidAction.SET_COVIDS,
  payload: data,
});
