import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Signup />} path="/register" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
