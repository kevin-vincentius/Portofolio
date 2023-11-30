import Link from "next/link";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth-actions"

const NavBar = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  console.log(authState);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (authState.uid) {
  //       const userDocRef = doc(db, "Users", authState.uid);
  //       const userDocSnapshot = await getDoc(userDocRef);
  //       console.log(userDocSnapshot)
  //     }
  //   };

  //   fetchUserData();
  // }, [authState.isAuth]);

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light ">
      <div className="container">
        <Link className="navbar-brand" href="/">
          BinarWave34
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="/gamelist">
                Game List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/userlist">
                User List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/tutorial">
                Tutorial
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {authState.isAuth ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" onClick={handleSignOut} href="/">
                    Sign Out
                  </Link>
                </li>
                <li className='nav-item d-flex align-items-center text-secondary'>
                  <span className="mx-3">Hi, {authState.isAuth && authState.username} </span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/profile">
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <Link className="nav-link" href="/register">
                  Register
                </Link>
                <Link className="nav-link" href="/login">
                  Login
                </Link>
              </>
            )}
            <li className="nav-item"></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
