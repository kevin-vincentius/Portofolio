
import React from 'react';
import  Link  from 'next/link'

function RedirectPopUp() {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>You have to login to access this page.</p>
        <Link href='/login'><button>Login</button></Link>
      </div>
    </div>
  );
}

export default RedirectPopUp;
