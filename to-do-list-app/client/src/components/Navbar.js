import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './navbar.css'
import RedirectPopUp from './RedirectPopUp/Redirectpopup';
import { signOut } from '../redux/authSlice'; 

const Navbar = () => {
  const token = useSelector(state => state.auth.token);
  const username = useSelector(state => state.auth.username);

  const dispatch = useDispatch();

  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(signOut());
  }

  return (
    <nav className="navbar bg-white">
      {!token && <RedirectPopUp/>}
      <div className="container flex-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="navbar-brand" style={{ color: 'black', textDecoration: 'none', fontSize: '1.5rem' }}>
          Listz
        </Link>
        <div className="navbar-nav d-flex flex-row">
          {token && <div className='nav-link'>Hi, {username}</div>}
          <Link to={'/login'} className='nav-link text-secondary' onClick={handleSignout}>
            Sign Out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
