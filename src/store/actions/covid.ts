import axios from "axios";
import { Dispatch } from "react";
import { Action } from "redux";

export const SET_TODO = "SET_TODO";
export const SET_TODOS = "SET_TODOS";
export const DONE_DELETE = "DONE_DELETE";

export enum CovidAction {
  SET_TODO = "SET_TODO",
  SET_TODOS = "SET_TODOS",
  DONE_DELETE = "DONE_DELETE",
}

const config: any = {};

export const getTodo = () => async (dispatch: Dispatch<any>) => {
  let todos = await axios.get(config.server.api + "/todos");
  dispatch(setTodos(todos.data));
};

export const addTodo = (message: string) => async (dispatch: Dispatch<any>) => {
  let todos = await axios.post(config.server.api + "/todos", {
    name: message,
  });
  dispatch(setTodo(todos.data));
};

export const deleteTodo = (id: string) => async (dispatch: Dispatch<any>) => {
  let todo = await axios.delete(config.server.api + "/todos/" + id);
  let todos = await axios.get(config.server.api + "/todos");
  dispatch(setTodos(todos.data));
};

const doneDelete = (id: string) => ({
  type: DONE_DELETE,
  payload: id,
});

const setTodo = (data: CovidAction) => ({
  type: SET_TODO,
  payload: data,
});

const setTodos = (data: CovidAction) => ({
  type: SET_TODOS,
  payload: data,
});
