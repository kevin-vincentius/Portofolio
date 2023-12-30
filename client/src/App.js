import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import { Home } from "./components/Home";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Login/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
