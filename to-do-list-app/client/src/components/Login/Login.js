import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axiosInstance from "../../axiosInstance";
import { loginPending, loginFailed, loginSuccess } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {
  const username_or_email = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const [PIN, setPIN] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef(PIN.map(() => React.createRef()));

  const handleInputChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "");
    const newPIN = [...PIN];
    newPIN[index] = value;
    setPIN(newPIN);

    if (value !== "" && index < PIN.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && PIN[index] === "") {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(loginPending());
    try {
      const response = await axiosInstance.post("/api/v1/auth/login", {
        username_or_email: username_or_email.current.value,
        PIN: PIN.join(""),
      });
      navigate("/");
      dispatch(
        loginSuccess({
          username: response.data.username,
          token: response.data.accessToken,
        })
      );
    } catch (err) {
      err.response.data.message
        ? dispatch(loginFailed(err.response.data.message))
        : dispatch(loginFailed("Login error, please try again"));
    }
  };

  return (
    <form
      className="vh-100 d-flex justify-content-center align-items-center mx-auto"
      onSubmit={handleLogin}
    >
      <div className="container py-5 h-100 col-lg-6">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div
            className="card loginbox text-white"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-5 text-center">
              <div className="mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Log in to your account</p>

                <div className="form-outline form-white mb-4 col-12 col-sm-8 mx-auto">
                  <label
                    className="form-label text-start"
                    htmlFor="typeEmailUsernameX"
                  >
                    Email/ Username
                  </label>
                  <input
                    type="text"
                    id="typeEmailUsernameX"
                    className="form-control form-control-lg"
                    ref={username_or_email}
                  />
                </div>

                <div className="form-outline form-white mb-4 col-12 col-sm-8 mx-auto">
                  <label className="form-label" htmlFor="typePINX">
                    PIN
                  </label>
                  <div className="d-flex justify-content-between col-12 col-sm-8 -auto ">
                    {PIN.map((digit, index) => (
                      <input
                        key={index}
                        type="password"
                        value={digit}
                        onChange={(e) => handleInputChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        maxLength={1}
                        ref={inputRefs.current[index]}
                        className="col-2 col-sm-3 pin-input"
                      />
                    ))}
                  </div>
                </div>
                {error && (
                  <div className="form-outline form-white mb-4 col-12 col-sm-8 mx-auto">
                    <label className="form-label text-danger">{error}</label>
                  </div>
                )}

                <button
                  className="btn btn-outline-light btn-lg px-5 mt-3"
                  type="submit"
                >
                  {loading ? "Loading..." : "Log In"}
                </button>
              </div>

              <div>
                <p className="mb-0">
                  Don't have an account?{" "}
                  <Link to={"/signup"} className="text-white-50 fw-bold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
