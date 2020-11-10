import { Action } from "redux";

export enum CovidTestResult {
  HOLD = 0,
  FAIL = 1,
  PASS = 2,
}

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface ErrorMessage {
  subscriber?: Subscriber;
  message: string;
  code: number;
  trace: string;
}
export interface ResponseData {
  isLoading: boolean;
  data: any;
  error?: ErrorMessage;
}

export enum Subscriber {
  INDEX_PAGE,
  GLOBAL,
}

export enum InStep {
  NOT_IN_QUEUE = 0,
  IN_QUEUE = 1,
  RAPID_TESTED_PASS = 2,
  RAPID_TESTED_FAIL = 3,
  PCR_TESTED_PASS = 4,
  PCR_TESTED_FAIL = 5,
}

export interface CovidTest {
  covid_test_id: number;
  citizen_id: string;
  queqe_id: string;
  fullname: string;
  checkin_datetime: Date;
  rapidtest_datetime: Date;
  rapidtest_status: CovidTestResult;
  pcrtest_datetime: Date;
  pcrtest_status: CovidTestResult;
  created_at: Date;
  updated_at: Date;
}

export interface Personal {
  personal_id: number;
  citizen_id: string;
  prefix: string;
  name: string;
  surname: string;
  institute: number;
  position_id: null;
  picture: string;
  status_personal: number;
  admin_id: number;
  date_add: Date;
}

export interface UserPosition {
  positionId: number;
  institute: Institute;
  institueId: number;
  positionName: string;
}

export interface Institute {
  instituteId: number;
  instituteNameTh: string;
  instituteNameEn: string;
}
