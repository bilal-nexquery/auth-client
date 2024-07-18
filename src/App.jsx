import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Signup />} path="/register" />
          <Route element={<Login />} path="/" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
