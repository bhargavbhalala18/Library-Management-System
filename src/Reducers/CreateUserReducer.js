import { ADD_USER, LOGIN_USER, LOGOUT_USER } from "../Action/actionTypes";

const initialState = {
  usersList: [],
  loggedUser: null,

};

const CreateUserReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_USER:
      return {
        ...state,
        usersList: [...state.usersList, action.payload]
      }

    case LOGIN_USER:
      return {
        ...state,
        loggedUser: action.payload
      }

    case LOGOUT_USER:
      return {
        ...state,
        loggedUser: null
      }

    default:
      return state
  }
}

export default CreateUserReducer;