import { ADD_BOOK, EDIT_BOOK, DELETE_BOOK, ASSIGN_BOOK, ASSIGN_EDIT, ASSIGN_RETURN } from "./actionTypes";

export const AddBook = (newbook) => {
  return {
    type: ADD_BOOK,
    payload: newbook
  }
};

export const EditBook = (editbook) => {
  return {
    type: EDIT_BOOK,
    payload: editbook
  }
}

export const DeleteBook = (bookId) => {
  return {
    type: DELETE_BOOK,
    payload: bookId
  }
}

export const AssignAdd = (newAssign) => {
  return {
    type: ASSIGN_BOOK,
    payload: newAssign
  }
}

export const AssignEdit = (editAssign) => {
  return {
    type: ASSIGN_EDIT,
    payload: editAssign
  }
}

export const AssignReturn = (AssignId) => {
  return {
    type: ASSIGN_RETURN,
    payload: AssignId
  }
}
