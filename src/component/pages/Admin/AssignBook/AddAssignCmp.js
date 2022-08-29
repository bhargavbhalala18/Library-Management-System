import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';
import EventAvailableTwoToneIcon from '@material-ui/icons/EventAvailableTwoTone';
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AssignAdd } from '../../../../Action/bookAction';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
var uniqid = require('uniqid');

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

export default function AddAssignCmp(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const object = {
    bookname: props.bookName,
    username: '',
    issuedate: new Date().toISOString().slice(0, 10),
    returndate: ''
  }

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
  const history = useHistory();

  // Add book using sumit btn
  const assignBook = (e) => {
    e.preventDefault();

    if (bookname && username && (issuedate < returndate)) {
      const newBook = {
        id: uniqid(),
        bookid: props.bookId,
        bookname: props.bookName,
        username: username,
        issuedate: new Date().toISOString().slice(0, 10),
        returndate: returndate
      }
      dispatch(AssignAdd(newBook))
      setBook(object);
      toast.success('Book Assigned to User Successfully', { position: toast.POSITION.BOTTOM_LEFT, autoClose: 3000 })
      setOpen(false)
      history.push('/admin/assignbook')
    } else {
      toast.error('please Enter Required Fields OR Set Proper Return Date', { position: toast.POSITION.TOP_CENTER, autoClose: false })
    }
  }

  const usersdata = useSelector((user) => user.createUsers.usersList)

  return (
    <>
      <Button color='primary' onClick={handleOpen} className='border border-3'>Assign</Button>
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
              <span className='addon'><ImportContactsTwoToneIcon Rounded /></span>
              <input type="text" name="bookname" onChange={(e) => inputChange(e)} value={bookname} placeholder='Enter Book Name' readOnly />
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
              <label htmlFor="">Issue Date</label>
              <div>
                <span className='addon'><EventAvailableTwoToneIcon /></span>
                <input type="date" name="issuedate" onChange={(e) => inputChange(e)} value={issuedate} />
              </div>
            </div>

            <div className="mx-4 my-3">
              <label htmlFor="">Return Date</label>
              <div>
                <span className='addon'><ScheduleTwoToneIcon /></span>
                <input type="date" name="returndate" onChange={(e) => inputChange(e)} value={returndate} />
              </div>
            </div>

            <button onClick={(e) => assignBook(e)} className="btn btn-outline-dark form-btn px-5 shadow mx-auto mt-4">Assign Book</button>
          </form>
        </Fade>
      </Modal>
    </>
  );
}