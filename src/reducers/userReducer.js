import { LOGIN_USER } from "../actions/types";

const initialState = {
  userCredentials: {},
  isValidToken: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      let isPayload = action.payload ? true : false;
      return {
        ...state,
        isValidToken: isPayload,
        userCredentials: action.payload
      };

    default:
      return state;
  }
};
