import Axios from "axios";
import { AnyAction, Dispatch } from "redux";
import config from "../../config";
import { Personal } from "../../utils/interface";
import { personalAction } from "../reducers/personalReducer";

export const fetchPersonals = () => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const response = await Axios.get(`${config.api.server}/covid/personal`);
    const personals: Array<Personal> = response.data;
    dispatch(setPersonals(personals));
  } catch (error) {
    console.log(error);
  }
};

export const deletePersonal = (personal_id: number) => async (
  dispatch: Dispatch<AnyAction>
): Promise<void> => {
  try {
    const response = await Axios.delete(
      `${config.api.server}/covid/deletePersonal`,
      {
        data: { personal_id },
      }
    );
    console.log(deletePersonal);
    dispatch(removePersonal(response.data[0]));
  } catch (error) {
    console.log(error);
  }
};

export const addPersonal = (data: Personal) => ({
  type: personalAction.ADD_PERSONAL,
  payload: data,
});

const setPersonals = (data: Array<Personal>) => ({
  type: personalAction.SET_PERSONALS,
  payload: data,
});
const removePersonal = (data: number) => ({
  type: personalAction.DELETE_PERSONAL,
  payload: data,
});
