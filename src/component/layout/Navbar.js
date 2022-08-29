import React from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {


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
                <NavLink className='nav-link' exact to='/'><i className="fa fa-home text-white"></i>Home</NavLink>
              </li>
              <li className="nav-item px-3">
                <NavLink className='nav-link' exact to='/login'><i className="fa fa-sign-in text-white"></i>Login</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar
