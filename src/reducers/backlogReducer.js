import {
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK
} from "../actions/types";

const initialState = {
  backlog: [],
  projectTask: {}
};

export const backlogReducer = (state = initialState, action) => {
  switch (action.payload) {
    case GET_BACKLOG:
      return {
        ...state,
        backlog: action.payload
      };

    case GET_PROJECT_TASK:
      return {
        ...state,
        projectTask: action.payload
      };

    case DELETE_PROJECT_TASK:
      return {
        // work in progress
      };

    default:
      return state;
  }
};
