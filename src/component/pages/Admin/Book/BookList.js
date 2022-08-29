import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import AddBookCmp from './AddBookCmp';
import EditBookCmp from './EditBookCmp';
import AddAssignCmp from '../AssignBook/AddAssignCmp';
import { useSelector, useDispatch } from 'react-redux';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { DeleteBook } from '../../../../Action/bookAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const useStyles = makeStyles({
  root: {
    maxWidth: '100vw',
    marginTop: '20px',
    borderRadius: '20px',
  },
  container: {
    maxHeight: 440,
  },
  tablePagination: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
  },
  deleteIcon: {
    '&:hover': {
      color: 'red',
    },
  },
});

export default function BookList() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Get Booklist and assignBooklist frome store
  const books = useSelector((state) => state.createBooks.books);
  const assign = useSelector((state) => state.createBooks.assignBooks);

  const dispatch = useDispatch();

  // Delete book functionality
  const deleteBook = (id) => {
    const compare = assign.map((a) => (a.bookid == id ? true : false));
    if (compare.includes(true)) {
      toast.warn('This Book Is Assigned, You Can Not Delete It', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      dispatch(DeleteBook(id));
      toast.success('Book is deleted successfully!', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <div className="d-flex mt-2 flex-column justify-content-center">
        <h3 className="text-black-50">Book List</h3>
        <AddBookCmp />
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className="shadow f-left">
                <TableRow>
                  <TableCell>No. </TableCell>
                  <TableCell>Book Name</TableCell>
                  <TableCell>Author Name</TableCell>
                  <TableCell>ISBN</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((book, index) => (
                    <TableRow key={book.id} hover role="checkbox">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{book.bookname}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.isbn}</TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell>
                        <EditBookCmp bookId={book.id} data={book} />
                        <Button onClick={() => deleteBook(book.id)}>
                          <DeleteRoundedIcon
                            className={classes.deleteIcon}
                            color="action"
                          />
                        </Button>
                        <AddAssignCmp
                          bookName={book.bookname}
                          bookId={book.id}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className={classes.tablePagination}
            rowsPerPageOptions={[6, 10, 25, 100]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}
