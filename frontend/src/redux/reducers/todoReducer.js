import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function todoReducer(state = initialState.todos, action) {
  switch (action.type) {
    case types.CREATE_TODO_SUCCESS:
      return [...state, { ...action.todo }];
    case types.UPDATE_TODO_SUCCESS:
      return state.map((todo) =>
        todo.Id === action.todo.Id ? action.todo : todo
      );
    case types.LOAD_TODOS_SUCCESS:
      return action.todos;
    case types.DELETE_TODO_OPTIMISTIC:
      return state.filter((todo) => todo.Id !== action.todo.Id);
    default:
      return state;
  }
}
