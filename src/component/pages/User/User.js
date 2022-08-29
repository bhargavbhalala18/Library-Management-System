import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../Action/userAction';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles({
  root: {
    maxWidth: '100vw',
    marginTop: '20px',
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
    "&:hover": {
      color: 'red'
    }
  },
});


const User = () => {
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

  const history = useHistory();
  const dispatch = useDispatch();

  const loggeduser = useSelector(state => state.createUsers.loggedUser)
  const assigns = useSelector(state => state.createBooks.assignBooks);

  const assignedBook = assigns.filter((assign) => assign.username == loggeduser.name)
  console.log(assignedBook);

  const logOut = () => {
    dispatch(logoutUser());
    history.push('/');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
          <NavLink className="navbar-brand" to='/'><i className="fa fa-book text-white" />Library Management</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item px-3">
                <button onClick={logOut} className="btn btn-outline-light rounded-pill px-4 mr-5 ml-auto">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className='user_page mt-4'>
        <div className='container' >
          <div className="row">
            <div className="main_div col-md-10 col-10 mx-auto">
              <h3 className='text-black-50'>Welcome {loggeduser.name}</h3>
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead className='shadow f-left'>
                      <TableRow>
                        <TableCell>No. </TableCell>
                        <TableCell>Book Name</TableCell>
                        <TableCell>Issue Date</TableCell>
                        <TableCell>Return Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        assignedBook.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((assign, index) => (
                          <TableRow key={assign.id} hover role="checkbox">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{assign.bookname}</TableCell>
                            <TableCell>{assign.issuedate}</TableCell>
                            <TableCell>{assign.returndate}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  className={classes.tablePagination}
                  rowsPerPageOptions={[6, 10, 25, 100]}
                  component="div"
                  count={assignedBook.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default User
