import React, { useState } from 'react'
import customerIcon from '../../images/customer.png';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Navbar from '../layout/Navbar'
import { loginUser } from '../../Action/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Login = () => {

  const object = {
    email: '',
    password: '',
    role: '',
  }

  const [user, setUser] = useState(object);

  const inputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const { role, email, password } = user;

  const history = useHistory();
  const dispatch = useDispatch();
  const usersData = useSelector(state => state.createUsers.usersList);

  if (usersData.length == 0) {
    history.push('/');
  }


  const logIn = (e) => {
    e.preventDefault();

    const data = usersData.filter(u => u.email === email && u.password === password && u.role === role)
    const result = data[0]
    console.log(result)

    if (data.length != 0) {
      const newUser = {
        id: result.id,
        name: result.name,
        role: role,
        email: email,
      }
      if (result.role == 'student') {
        history.push(`/user`)
      } else if (result.role == 'admin') {
        history.push(`/admin/booklist`)
      }
      dispatch(loginUser(newUser))
    } else {
      toast.error('Enter Correct Details', { position: toast.POSITION.TOP_CENTER, autoClose: false });
    }

  }

  return (
    <>
      <Navbar />

      <section className='user_page mt-4'>
        <div className='container' >
          <div className="row">
            <div className="main_div col-md-4 col-10 mx-auto">
              <form onSubmit={(e) => logIn(e)} className='p-5'>
                <figure className='d-flex justify-content-center'>
                  <img className='border border-5 rounded-circle border-dark' src={customerIcon} alt="users" />
                </figure>
                <h4 className='heading1 text-center mx-auto'>User Login Form</h4>
                <div className="my-4">
                  <span className='addon'><i className="fa fa-user text-dark"></i></span>
                  <select className="form-contro" value={role} name='role' onChange={(e) => inputChange(e)}>
                    <option value='' disabled>Select role</option>
                    <option value='student'>Student</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
                <div className="mb-4">
                  <span className='addon'><i className="fa fa-envelope text-dark"></i></span>
                  <input type="email" name="email" onChange={(e) => inputChange(e)} value={email} placeholder='info@example.com' />
                </div>
                <div className="mb-4">
                  <span className='addon'><i className="fa fa-lock text-dark"></i></span>
                  <input type="password" name="password" onChange={(e) => inputChange(e)} value={password} placeholder='Password' />
                </div>
                <button type="submit" className="btn btn-outline-dark form-btn px-5 mx-auto mt-4">Login</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Login
