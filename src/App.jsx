import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RequireAuth from "./context/RequireAuth";
import { AuthProvider } from "./context/AuthProvider";
import ResetPassword from "./components/ResetPassword";

import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route element={<Dashboard />} path="/" />
            </Route>
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/register" />
            <Route element={<ResetPassword />} path="/reset-password/:token/" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
