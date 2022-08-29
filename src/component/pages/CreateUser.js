import React from 'react'
import { useState } from 'react';
import customerIcon from '../../images/customer.png';
import { useDispatch } from 'react-redux';
import { addUser } from '../../Action/userAction';
import Navbar from '../../component/layout/Navbar';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();
var uniqid = require('uniqid');

const CreateUser = () => {

  // Initial use object
  const object = {
    name: '',
    email: '',
    password: '',
    role: '',
  }

  // state for input change
  const [user, setUser] = useState(object);

  // onChange on input
  const inputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // Destructuring of user
  const { name, email, password, role } = user;

  const dispatch = useDispatch();
  const history = useHistory();

  //Take user List from store
  const allUser = useSelector(state => state.createUsers.usersList);

  // onSubmit to create user
  const submitUser = (e) => {
    e.preventDefault();

    if (allUser.map(u => u.name == name).includes(true)) {
      toast.warn('Name is already exist', { position: toast.POSITION.TOP_CENTER, autoClose: false });
    } else if (allUser.map(u => u.email == email).includes(true)) {
      toast.warn('Email ID is already exist', { position: toast.POSITION.TOP_CENTER, autoClose: false });
    } else {

      if (name && email && password && role) {
        const newUser = {
          id: uniqid(),
          name: name,
          email: email,
          password: password,
          role: role,
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString()
        }
        dispatch(addUser(newUser));
        setUser(object);
        toast.success('successfully SignUp', { position: toast.POSITION.BOTTOM_LEFT, autoClose: 3000 });
        history.push('/login')
      } else {
        toast.error('Please Enter Required Details', { position: toast.POSITION.TOP_CENTER, autoClose: false });
      }
    }
  }

  return (
    <>
      <Navbar />
      <section className='user_page mt-5'>
        <div className='container' >
          <div className="row">
            <div className="main_div col-md-4 col-10 mx-auto">
              <form onSubmit={(e) => submitUser(e)} className='p-4'>
                <figure className='d-flex justify-content-center'>
                  <img className='border border-5 rounded-circle border-dark' src={customerIcon} alt="users" />
                </figure>
                <h4 className='heading1 text-center mx-auto'>User SignUp Form</h4>
                <div className="my-4">
                  <span className='addon'><i className="fa fa-user-circle text-dark"></i></span>
                  <input type="text" name="name" onChange={(e) => inputChange(e)} placeholder='Name' value={name} />
                </div>
                <div className="mb-4">
                  <span className='addon'><i className="fa fa-envelope text-dark"></i></span>
                  <input type="email" name="email" onChange={(e) => inputChange(e)} value={email} placeholder='info@example.com' />
                </div>
                <div className="mb-4">
                  <span className='addon'><i className="fa fa-user text-dark"></i></span>
                  <select className="form-contro" value={role} name='role' onChange={(e) => inputChange(e)} >
                    <option value='' disabled>Select role</option>
                    <option value='student'>Student</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
                <div className="mb-4">
                  <span className='addon'><i className="fa fa-lock text-dark"></i></span>
                  <input type="password" name="password" onChange={(e) => inputChange(e)} value={password} placeholder='Password' />
                </div>
                <button type="submit" className="btn btn-outline-dark form-btn px-5 mx-auto mt-4">Create</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CreateUser
