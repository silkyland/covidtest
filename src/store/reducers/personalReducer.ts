import {
  ActionWithPayload,
  Personal,
  StatusPersonal,
} from "../../utils/interface";
import { errorState } from "../actions/mics";

export enum personalAction {
  SET_PERSONAL = "SET_PERSONAL",
  SET_PERSONALS = "SET_PERSONALS",
  ADD_PERSONAL = "ADD_PERSONAL",
  UPDATE_PERSONAL = "UPDATE_PERSONAL",
  DELETE_PERSONAL = "DELETE_PERSONAL",
}

export enum statusPersonalAction {
  SET_STATUS_PERSONAL = "SET_STATUS_PERSONAL",
  SET_STATUS_PERSONALS = "SET_STATUS_PERSONALS",
  ADD_STATUS_PERSONAL = "ADD_STATUS_PERSONAL",
  UPDATE_STATUS_PERSONAL = "UPDATE_STATUS_PERSONAL",
  DELETE_STATUS_PERSONAL = "DELETE_STATUS_PERSONAL",
}

const initialState = {
  personals: [] as Array<Personal>,
  personal: {} as Personal,
  statusPersonals: [] as Array<StatusPersonal>,
  statusPersonal: {} as StatusPersonal,
};

export const PersonalReducer = (
  state = initialState,
  action: ActionWithPayload<any> | ActionWithPayload<Array<any>>
) => {
  switch (action.type) {
    case personalAction.SET_PERSONALS:
      return { ...state, personals: action.payload };
    case personalAction.SET_PERSONAL:
      return { ...state, personal: action.payload };
    case personalAction.ADD_PERSONAL:
      //   const index = state.personals.findIndex(
      //     (p: Personal) => (p.personal_id = action.payload.personal_id)
      //   );
      return state.personals.concat(action.payload);
    default:
      return state;
  }
};
