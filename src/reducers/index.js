import { combineReducers } from "redux";
import { errorReducer } from "./errorReducer";
import { projectReducer } from "./projectReducer";
import { backlogReducer } from "./backlogReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
  errors: errorReducer,
  projects: projectReducer,
  backlog: backlogReducer,
  user: userReducer
});
