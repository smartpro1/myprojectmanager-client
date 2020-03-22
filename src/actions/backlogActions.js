import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG,
  UPDATE_PROJECT_TASK,
  GET_PROJECT_TASK
} from "./types";

export const addProjectTask = (
  projectIdentifier,
  projectTask,
  history
) => async dispatch => {
  try {
    await axios.post(`/api/backlog/${projectIdentifier}`, projectTask);
    history.push(`/projectBoard/${projectIdentifier}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getBacklog = projectIdentifier => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${projectIdentifier}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const updateProjectTask = (
  projectIdentifier,
  projectSequence,
  projectTask,
  history
) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/backlog/${projectIdentifier}/${projectSequence}`,
      projectTask
    );
    history.push(`/projectBoard/${projectIdentifier}`);
    dispatch({
      type: UPDATE_PROJECT_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getProjectTask = (
  projectIdentifier,
  projectSequence
) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/backlog/${projectIdentifier}/${projectSequence}`
    );
    dispatch({
      type: GET_PROJECT_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
