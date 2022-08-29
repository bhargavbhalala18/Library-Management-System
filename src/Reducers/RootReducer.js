import CreateUserReducer from './CreateUserReducer';
import { combineReducers } from 'redux';
import BookReducer from './BookReducer';

const RootReducer = combineReducers({
  createUsers: CreateUserReducer,
  createBooks: BookReducer
})

export default RootReducer;