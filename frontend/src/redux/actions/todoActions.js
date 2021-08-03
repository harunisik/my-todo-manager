import * as types from "./actionTypes";
import * as todoApi from "../../api/todoApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadTodoSuccess(todos) {
  return { type: types.LOAD_TODOS_SUCCESS, todos };
}

export function createTodoSuccess(todo) {
  return { type: types.CREATE_TODO_SUCCESS, todo };
}

export function updateTodoSuccess(todo) {
  return { type: types.UPDATE_TODO_SUCCESS, todo };
}

export function deleteTodoOptimistic(todo) {
  return { type: types.DELETE_TODO_OPTIMISTIC, todo };
}

export function loadTodos() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return todoApi
      .getTodos()
      .then((todos) => {
        dispatch(loadTodoSuccess(todos));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveTodo(todo) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return todoApi
      .saveTodo(todo)
      .then((savedTodo) => {
        todo.Id
          ? dispatch(updateTodoSuccess(savedTodo))
          : dispatch(createTodoSuccess(savedTodo));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteTodo(todo) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteTodoOptimistic(todo));
    return todoApi.deleteTodo(todo);
  };
}
