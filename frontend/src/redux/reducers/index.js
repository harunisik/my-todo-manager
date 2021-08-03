import { combineReducers } from "redux";
import todos from "./todoReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  todos,
  apiCallsInProgress,
});

export default rootReducer;
