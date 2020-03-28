import axios from "axios";
import { GET_ERRORS, LOGIN_USER } from "./types";
import { setJwtToken } from "../securityUtils/setJwtToken";
import jwtDecode from "jwt-decode";

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

export const loginUser = (userCredentials, history) => async dispatch => {
  try {
    // steps to login a user
    // 1. Hit the end point with a post request
    const res = await axios.post(`/api/users/login`, userCredentials);
    // 2. Extract token from res.data
    const { token } = res.data;
    // 3. Store the token in local storage
    localStorage.setItem("jwtToken", token);
    //4 . Set our token in the header, we will create a method to do this
    setJwtToken(token);
    // 5. Decode token on React
    const decodedJwtToken = jwtDecode(token);
    // 6. Dispatch to our securityReducer
    dispatch({
      type: LOGIN_USER,
      payload: decodedJwtToken
    });

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
