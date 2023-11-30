import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { GoogleAuthProvider } from "firebase/auth";
import email_icon from "../Assets/email.png";
import { Alert } from "react-bootstrap";
import password_icon from "../Assets/password.png";
import { login } from "../../redux/auth-actions";
// import {  signInWithGoogle } from "../../redux/auth-actions";
// import googleIcon from "../../../public/google-icon.png"
import { authActions } from "@/redux/authSlice";

export let socialMediaUser = {};

const Login = () => {
  const router = useRouter();
  const email = useRef();
  const password = useRef();
  // const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.auth.errorLog);

  useEffect(() => {
    if (auth.isAuth) {
      router.push("/");
    }

    // Move the dispatch inside the useEffect
    dispatch(authActions.resetStatusUserRegistered());
    // console.log('user registered:', auth.userRegistered);
  }, [auth.isAuth]);
  // reset status user registered ke false setiap render login (utk logic di component register). kalo tidak, jadi gabisa balik ke /register karena logic if di register

  // const handleGoogleLogin = async () => {
  //   dispatch(signInWithGoogle(provider));
  //   router.push("/")
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(login(email.current.value, password.current.value));
  };


  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="RegisterLoginContainer">
          <div className="RegisterLoginHeader">
            <div className="text">Login</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <Image src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email"
                required
                ref={email}
              />
            </div>
            <div className="input">
              <Image src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                ref={password}
                required
              />
            </div>
          </div>
          <div className="forgot-password">
            <p>
              Forget Password?{" "}
              <span onClick={() => router.push("/reset-password")}>
                Click Here!
              </span>
            </p>
            {/* <button
              onClick={handleGoogleLogin}
              className="btn btn-light border"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "480px",
                margin: "10px 0",
              }}
            >
              <Image
                src={googleIcon}
                alt="Google Logo"
                style={{ marginRight: "10px", width: "24px", height: "24px" }}
              />
              Sign in with Google
            </button>{" "} */}
            {error && (
              <div className="error-box">
                <Alert variant="danger" className="error-message">
                  {error}
                </Alert>
              </div>
            )}
          </div>
          <div className="submit-container">
            <button type="submit" className="submit">
              {auth.loading ? "Authenticating..." : "Login"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
