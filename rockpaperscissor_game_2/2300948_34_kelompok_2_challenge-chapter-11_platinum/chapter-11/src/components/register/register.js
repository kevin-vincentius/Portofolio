import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/redux/auth-actions";
import Image from "next/image";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const username = useRef();
  // const loading = useSelector((state) => state.auth.loading)
  const userRegistered = useSelector((state) => state.auth.userRegistered);
  const error = useSelector((state) => state.auth.errorReg);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    // Check if emailValue contains "@" symbol
    if (!emailValue.includes("@")) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
    // Update the email ref with the new value
    email.current.value = emailValue;
  };

  const handleUsernameChange = (e) => {
    const usernameValue = e.target.value;
    // Check if usernameValue is an empty string or has less than 5 characters
    if (usernameValue === "" || usernameValue.length < 5) {
      setInvalidUsername(true);
    } else {
      setInvalidUsername(false);
    }
    // Update the username ref with the new value
    username.current.value = usernameValue;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    dispatch(
      register({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      })
    );
  };

  if (userRegistered) {
    router.push("/login");
  }

  return (
    <form onSubmit={handleRegister}>
      <div className="RegisterLoginContainer">
        <div className="RegisterLoginHeader">
          <div className="text">Register</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <Image src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Username"
              ref={username}
              required
              onChange={handleUsernameChange}
            />
            {invalidUsername && (
              <div className="error-message">
                Please Input more than 5 characters
              </div>
            )}
          </div>
          <div className="input">
            <Image src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              ref={email}
              required
              onChange={handleEmailChange}
            />
            {invalidEmail && (
              <div className="error-message">Invalid email format</div>
            )}
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
          {error && (
            <div className="error-box">
              <Alert variant="danger" className="error-message">
                {error}
              </Alert>
            </div>
          )}
          {/* {(userRegistered && !loading) && (
              <div className="error-box">
                <Alert variant="success" className="error-message">Registration success!</Alert>  
              </div>
            )} */}
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
