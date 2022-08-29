import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import ImportContactsTwoToneIcon from '@material-ui/icons/ImportContactsTwoTone';
import PermIdentityTwoToneIcon from '@material-ui/icons/PermIdentityTwoTone';
import DialpadTwoToneIcon from '@material-ui/icons/DialpadTwoTone';
import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditBook } from '../../../../Action/bookAction';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
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
    height: '80%'
  },
  editIcon: {
    "&:hover": {
      color: 'green'
    },
  },
}));

export default function EditBookCmp(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const object = {
    bookname: '',
    author: '',
    isbn: '',
    category: ''
  }

  // state for changing input
  const [book, setBook] = useState(object);

  // Input change event
  const inputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  }

  // Destructuring Book
  const { bookname, author, isbn, category } = book;

  // dispatch for Addbook action
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);

    if (props.data != null) {
      setBook(props.data)
    }
  };

  // edit book using sumit btn
  const editBook = (e) => {
    e.preventDefault();

    if (bookname && author && isbn && category) {
      const updateBook = Object.assign(props.data, { bookname: bookname, author: author, isbn: isbn, category: category })
      dispatch(EditBook(updateBook))
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
            <h4 className='heading1 text-center mx-auto mb-4'>Update Book</h4>
            <div className="mx-4 my-3">
              <span className='addon'><ImportContactsTwoToneIcon Rounded /></span>
              <input type="text" name="bookname" onChange={(e) => inputChange(e)} value={bookname} placeholder='Enter Book Name' />
            </div>
            <div className="mx-4 my-3">
              <span className='addon'><PermIdentityTwoToneIcon /></span>
              <input type="text" name="author" onChange={(e) => inputChange(e)} value={author} placeholder='Enter Author Name' />
            </div>
            <div className="mx-4 my-3">
              <span className='addon'><DialpadTwoToneIcon /></span>
              <input type="text" name="isbn" onChange={(e) => inputChange(e)} value={isbn} placeholder='Enter ISBN number' />
            </div>
            <div className="mx-4 my-3">
              <span className='addon'><CategoryTwoToneIcon /></span>
              <select className="form-contro" onChange={(e) => inputChange(e)} value={category} name='category'>
                <option value='' disabled>Book Category</option>
                <option value='Technical'>Technical</option>
                <option value='Story Book'>Story Book</option>
                <option value='Educational'>Educational</option>
              </select>
            </div>
            <button onClick={(e) => editBook(e)} className="btn btn-outline-dark form-btn px-5 shadow mx-auto mt-4">Update Book</button>
          </form>
        </Fade>
      </Modal>
    </>
  );
}