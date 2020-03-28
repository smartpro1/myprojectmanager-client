import axios from "axios";
import { GET_ERRORS } from "./types";

export const registerUser = (newUser, history) => async dispatch => {
  try {
    await axios.post(`/api/users/register`, newUser);
    history.push("/login");
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
