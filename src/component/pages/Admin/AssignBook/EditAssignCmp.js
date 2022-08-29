import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EventAvailableTwoToneIcon from '@material-ui/icons/EventAvailableTwoTone';
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AssignEdit } from '../../../../Action/bookAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    width: 400,
    height: '90%'
  },
}));

export default function EditAssignCmp(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const object = {}

  // state for changing input
  const [book, setBook] = useState(object);

  // Input change event
  const inputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  }

  // Destructuring Book
  const { bookname, username, issuedate, returndate } = book;

  // dispatch for Addbook action
  const dispatch = useDispatch();

  // Use state 
  const usersdata = useSelector((user) => user.createUsers.usersList);
  const booksdata = useSelector((state) => state.createBooks.books);

  //find selected book id from booksdata
  const book1 = booksdata.filter(book => book.bookname == bookname);

  const handleOpen = () => {
    setOpen(true);
    if (props.data != null) {
      setBook(props.data)
    }
  };

  // Add book using sumit btn
  const editAssign = (e) => {
    e.preventDefault();

    if (bookname && username && (issuedate < returndate)) {
      const updateAssign = {
        id: props.assignId,
        bookid: book1.id,
        bookname: bookname,
        username: username,
        issuedate: issuedate,
        returndate: returndate
      };
      dispatch(AssignEdit(updateAssign))
      setBook(object);
      toast.success('Updated Successfully', { position: toast.POSITION.BOTTOM_LEFT, autoClose: 3000 })
      setOpen(false);
    } else {
      toast.warn('please Enter Required Fields', { position: toast.POSITION.TOP_CENTER, autoClose: false })
    }
  }

  return (
    <>
      <Button onClick={handleOpen}><EditRoundedIcon className={classes.editIcon} color='action' /></Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>

          <form className={classes.paper}>

            <button className='ml-auto mr-5 border-0 form-control-lg p-0 bg-aqua' type='text' onClick={(e) => handleClose(e)}>
              <span className='font-weight-bolder form-control-lg'>&times;</span>
            </button>

            <h4 className='heading1 text-center mx-auto my-4'>Assign Book To User</h4>

            <div className="mx-4 my-3">
              <span className='addon'><CategoryTwoToneIcon /></span>
              <select className="form-select" name='bookname' onChange={(e) => inputChange(e)} value={bookname}>
                {booksdata.map((book) =>
                  <option value={book.bookname}>{book.bookname}</option>
                )}
              </select>

            </div>

            <div className="mx-4 my-3">
              <span className='addon'><CategoryTwoToneIcon /></span>
              <div className='wrapper'>
                <select className="form-select" name='username' onChange={(e) => inputChange(e)} value={username}>
                  <option value='' disabled>Select User</option>
                  {usersdata.map((user) => user.role == 'student' ?
                    <option key={user.id} value={user.name}>{user.name}</option> : ''
                  )}
                </select>
              </div>
            </div>

            <div className="mx-4 my-3">
              <span className='addon'><EventAvailableTwoToneIcon /></span>
              <input type="date" name="issuedate" onChange={(e) => inputChange(e)} value={issuedate} placeholder='Enter ISBN number' />
            </div>

            <div className="mx-4 my-3">
              <span className='addon'><ScheduleTwoToneIcon /></span>
              <input type="date" name="returndate" onChange={(e) => inputChange(e)} value={returndate} placeholder='Enter ISBN number' />
            </div>

            <button onClick={(e) => editAssign(e)} className="btn btn-outline-dark form-btn px-5 shadow mx-auto mt-4">Assign Book</button>
          </form>
        </Fade>
      </Modal>
    </>
  );
}