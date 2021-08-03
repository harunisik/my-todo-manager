import todoReducer from "./todoReducer";
import * as actions from "../actions/todoActions";

it("should add todo when passed CREATE_TODO_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      Title: "A",
    },
    {
      Title: "B",
    },
  ];

  const newTodo = {
    Title: "C",
  };

  const action = actions.createTodoSuccess(newTodo);

  // act
  const newState = todoReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].Title).toEqual("A");
  expect(newState[1].Title).toEqual("B");
  expect(newState[2].Title).toEqual("C");
});

it("should update todo when passed UPDATE_TODO_SUCCESS", () => {
  // arrange
  const initialState = [
    { Id: 1, Title: "A" },
    { Id: 2, Title: "B" },
    { Id: 3, Title: "C" },
  ];

  const todo = { Id: 2, Title: "New Title" };
  const action = actions.updateTodoSuccess(todo);

  // act
  const newState = todoReducer(initialState, action);
  const updatedTodo = newState.find((a) => a.Id == todo.Id);
  const untouchedTodo = newState.find((a) => a.Id == 1);

  // assert
  expect(updatedTodo.Title).toEqual("New Title");
  expect(untouchedTodo.Title).toEqual("A");
  expect(newState.length).toEqual(3);
});
