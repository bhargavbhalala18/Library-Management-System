import { ADD_USER, LOGIN_USER, LOGOUT_USER } from "./actionTypes";

export const addUser = (newUser) => {
  return {
    type: ADD_USER,
    payload: newUser
  }
};

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  }
}
