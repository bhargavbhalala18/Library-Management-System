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
import { useSelector, useDispatch } from 'react-redux';
import EditAssignCmp from './EditAssignCmp';
import { AssignReturn } from '../../../../Action/bookAction';

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

export default function AssignList() {
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

  const assigns = useSelector((state) => state.createBooks.assignBooks);

  const dispatch = useDispatch();

  const returnBook = (id) => {
    dispatch(AssignReturn(id));
  };

  return (
    <>
      <div className="d-flex mt-2 flex-column justify-content-center">
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <h3 className="text-black-50">Assign Book List</h3>
              <TableHead className="shadow f-left">
                <TableRow>
                  <TableCell>No. </TableCell>
                  <TableCell>Book Name</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Issue Date</TableCell>
                  <TableCell>Return Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assigns
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((assign, index) => (
                    <TableRow key={assign.id} hover role="checkbox">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{assign.bookname}</TableCell>
                      <TableCell>{assign.username}</TableCell>
                      <TableCell>{assign.issuedate}</TableCell>
                      <TableCell>{assign.returndate}</TableCell>
                      <TableCell>
                        <EditAssignCmp
                          assignId={assign.id}
                          data={assign}
                          color="primary"
                        />
                        <Button
                          onClick={() => returnBook(assign.id)}
                          color="secondary"
                          className="border border-3"
                        >
                          Return
                        </Button>
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
            count={assigns.length}
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
