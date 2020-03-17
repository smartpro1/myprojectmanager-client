import {
  GET_PROJECTS,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT
} from "../actions/types";

const initialState = {
  projects: [],
  project: {}
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };

    case GET_PROJECT:
      return {
        ...state,
        project: action.payload
      };

    case UPDATE_PROJECT:
      const indexNum = state.projects.findIndex(
        ele => ele.projectIdentifier === action.payload.projectIdentifier
      );
      let newProjects = state.projects;
      newProjects[indexNum] = action.payload;
      return {
        ...state,
        project: newProjects
      };

    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          project => project.projectIdentifier !== action.payload
        )
      };

    default:
      return state;
  }
};
