import Axios from "axios";
import { AnyAction, Dispatch } from "redux";
import config from "../../config";
import { CovidTest, ResponseData, Subscriber } from "../../utils/interface";
import { covidAction } from "../reducers/covidReducer";
import fetchAPI from "../services/fetchApi";
import { errorState, setErrorState } from "./mics";

export const scan = (citizen_id: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const reponse = await fetchAPI.post(`${config.api.server}`, { citizen_id });
    dispatch(setCovids(reponse.data));
  } catch (error: any) {
    dispatch(
      setErrorState(errorState.HAS_ERROR, {
        code: 500,
        message: "เกิดข้อผิดพลาดขณะทำการเรียกข้อมูล",
        trace: JSON.stringify(error.response),
      })
    );
  }
};

export const fetchQueqe = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    dispatch(setQueqes({ isLoading: true, data: [] }));
    const response = await Axios.get(`${config.api.server}/covid/queqe`);
    dispatch(setQueqes({ isLoading: false, data: response.data }));
  } catch (error) {
    console.log(error.response);
    dispatch(
      setQueqes({
        isLoading: false,
        data: [],
        error: {
          code: 500,
          message: "เกิดข้อผิดพลาดขณะทำการเรียกข้อมูล",
          trace: error.response?.data?.message,
        },
      })
    );
  }
};

const deleteCovid = (id: string) => ({
  type: covidAction.DELETE_COVID,
  payload: id,
});

const setCovid = (data: CovidTest) => ({
  type: covidAction.SET_COVID,
  payload: data,
});

const setCovids = (data: CovidTest) => ({
  type: covidAction.SET_COVIDS,
  payload: data,
});

const setQueqes = (data: ResponseData) => ({
  type: covidAction.SET_QUEQES,
  payload: data,
});
