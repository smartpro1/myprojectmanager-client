import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import { getProjectReducer } from "./getProjectReducer";

export default combineReducers({
  errors: errorReducer,
  projects: getProjectReducer
});
