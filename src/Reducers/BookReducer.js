import { ADD_BOOK, DELETE_BOOK, EDIT_BOOK, ASSIGN_BOOK, ASSIGN_EDIT, ASSIGN_RETURN } from '../Action/actionTypes';

const initialState = {
  books: [],
  assignBooks: [],
}

const BookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload]
      }
    case EDIT_BOOK:
      return {
        ...state,
        books: state.books.map(book => book.id == action.payload.id ? action.payload : book)
      }
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id != action.payload)
      }
    case ASSIGN_BOOK:
      return {
        ...state,
        assignBooks: [...state.assignBooks, action.payload]
      }
    case ASSIGN_EDIT:
      return {
        ...state,
        assignBooks: state.assignBooks.map(book => book.id == action.payload.id ? action.payload : book)
      }
    case ASSIGN_RETURN:
      return {
        ...state,
        assignBooks: state.assignBooks.filter(book => book.id != action.payload)
      }

    default:
      return state

  }
}

export default BookReducer