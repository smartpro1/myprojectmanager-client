import axios from "axios";
import { GET_ERRORS } from "./types";

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
