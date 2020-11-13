import Axios from "axios";
import { AnyAction, Dispatch } from "redux";
import config from "../../config";
import { ResponseData } from "../../utils/interface";
import { covidAction } from "../reducers/covidReducer";
import fetchAPI from "../services/fetchApi";
import { errorState, setErrorState } from "./mics";

export const checkin = (citizen_id: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    dispatch(setCovid({ isLoading: true, data: {} }));
    const response = await fetchAPI.post(`${config.api.server}/covid/checkin`, {
      citizen_id,
    });
    dispatch(addQueqe({ data: response.data }));
    dispatch(setCovid({ isLoading: false, data: response.data }));
  } catch (error: any) {
    dispatch(
      setCovid({
        isLoading: false,
        error: {
          code: 500,
          message: "เกิดข้อผิดพลาดขณะทำการเรียกข้อมูล",
          trace: error.response?.data?.message,
        },
      })
    );
    // setTimeout(() => {
    //   dispatch(
    //     setCovid({
    //       isLoading: false,
    //       data: [],
    //       error: {},
    //     })
    //   );
    // }, 3000);
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
    // setTimeout(() => {
    //   dispatch(
    //     setQueqes({
    //       isLoading: false,
    //       data: [],
    //       error: {},
    //     })
    //   );
    // }, 3000);
  }
};

const deleteCovid = (id: string) => ({
  type: covidAction.DELETE_COVID,
  payload: id,
});

const addQueqe = (data: ResponseData) => ({
  type: covidAction.ADD_QUEQE,
  payload: data,
});

const setCovid = (data: ResponseData) => ({
  type: covidAction.SET_COVID,
  payload: data,
});

const setCovids = (data: ResponseData) => ({
  type: covidAction.SET_COVIDS,
  payload: data,
});

const setQueqes = (data: ResponseData) => ({
  type: covidAction.SET_QUEQES,
  payload: data,
});
