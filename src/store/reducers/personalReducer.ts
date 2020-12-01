import {
  ActionWithPayload,
  Personal,
  StatusPersonal,
} from "../../utils/interface";

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
  console.log(action.payload);
  switch (action.type) {
    case personalAction.SET_PERSONALS:
      return { ...state, personals: action.payload };
    case personalAction.SET_PERSONAL:
      return { ...state, personal: action.payload };
    case personalAction.ADD_PERSONAL:
      return { ...state, personals: state.personals.concat(action.payload) };
    case personalAction.DELETE_PERSONAL:
      return {
        ...state,
        personals: state.personals.filter(
          (p: Personal) => p.personal_id !== action.payload
        ),
      };
    default:
      return state;
  }
};
