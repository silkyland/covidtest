import Axios from "axios";
import { AnyAction, Dispatch } from "redux";
import config from "../../config";
import { CovidTestResult, ResponseData } from "../../utils/interface";
import { covidAction } from "../reducers/covidReducer";
import fetchAPI from "../services/fetchApi";

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
          message: "โปรดตรวจสอบ",
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

export const submitTestResult = (
  type: "RAPID" | "PCR",
  citizen_id: string,
  status: CovidTestResult.PASS | CovidTestResult.FAIL
) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    dispatch(setCovid({ isLoading: true, data: {} }));
    const response = await fetchAPI.post(
      type === "RAPID"
        ? `${config.api.server}/covid/rapidTestConfirm`
        : `${config.api.server}/covid/pcrTestConfirm`,
      {
        citizen_id,
        status,
      }
    );
    dispatch(
      type === "RAPID"
        ? addRapid({ data: response.data })
        : addPCR({ data: response.data })
    );
    dispatch(setCovid({ isLoading: false, data: response.data }));
  } catch (error: any) {
    dispatch(
      setCovid({
        isLoading: false,
        error: {
          code: 500,
          message: "มีบางอย่างเกิดขึ้น",
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

export const reprint = (citizen_id: string) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    dispatch(setCovid({ isLoading: true, data: {} }));
    const response = await fetchAPI.post(`${config.api.server}/covid/reprint`, {
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

export const fetchRapidTestList = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    dispatch(setRapids({ isLoading: true, data: [] }));
    const response = await Axios.get(
      `${config.api.server}/covid/rapidTestList`
    );
    dispatch(setRapids({ isLoading: false, data: response.data }));
  } catch (error) {
    dispatch(
      setRapids({
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

export const fetchPCRTestList = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    dispatch(setPCRs({ isLoading: true, data: [] }));
    const response = await Axios.get(`${config.api.server}/covid/pcrTestList`);
    dispatch(setPCRs({ isLoading: false, data: response.data }));
  } catch (error) {
    dispatch(
      setPCRs({
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

export const fetchBillboards = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    dispatch(setBillboards({ isLoading: true, data: [] }));
    const response = await Axios.get(`${config.api.server}/covid/billboard`);
    dispatch(setBillboards({ isLoading: false, data: response.data }));
  } catch (error) {
    dispatch(
      setBillboards({
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

const addRapid = (data: ResponseData) => ({
  type: covidAction.ADD_RAPID,
  payload: data,
});

const addPCR = (data: ResponseData) => ({
  type: covidAction.ADD_PCR,
  payload: data,
});

const addBillboard = (data: ResponseData) => ({
  type: covidAction.ADD_BILLBOARD,
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

const setRapids = (data: ResponseData) => ({
  type: covidAction.SET_RAPIDS,
  payload: data,
});

const setPCRs = (data: ResponseData) => ({
  type: covidAction.SET_PCRS,
  payload: data,
});

const setBillboards = (data: ResponseData) => ({
  type: covidAction.SET_BILLBOARDS,
  payload: data,
});
