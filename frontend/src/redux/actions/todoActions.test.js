import * as todoActions from "./todoActions";
import * as types from "./actionTypes";
import { todos } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Todos Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_TODOS_SUCCESS when loading todos", () => {
      fetchMock.mock("*", {
        body: todos,
        headers: { "content-type": "application/json" },
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_TODOS_SUCCESS, todos },
      ];

      const store = mockStore({ todos: [] });
      return store.dispatch(todoActions.loadTodos()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createTodoSuccess", () => {
  it("should create a CREATE_TODO_SUCCESS action", () => {
    //arrange
    const todo = todos[0];
    const expectedAction = {
      type: types.CREATE_TODO_SUCCESS,
      todo,
    };

    //act
    const action = todoActions.createTodoSuccess(todo);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
