import React from 'react';
import { Link } from 'react-router-dom';
import './redirectpopup.css'

const RedirectPopUp = () => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>You have to login to access this page.</p>
        <Link to='/login'><button>Login</button></Link>
      </div>
    </div>
  );
}

export default RedirectPopUp;
