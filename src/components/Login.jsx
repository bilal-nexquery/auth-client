import React, { useEffect, useRef } from "react";
import styles from "./Login.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Login() {
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <>
      <div
        className={`container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center overflow-auto ${styles.LoginWrapper}`}
      >
        <div
          className={`container d-flex flex-column mx-0 mb-4 px-5 py-5 ${styles.formWrapper}`}
        >
          <p className="fs-3 mb-4">Login to your Account</p>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                className={`rounded-0 ${styles.inputFeilds}`}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              style={{ marginBottom: "2.5rem" }}
              controlId="formGroupPassword1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className={`rounded-0 ${styles.inputFeilds}`}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className={`w-100 rounded-1 ${styles.LoginButton}`}
            >
              Login
            </Button>
          </Form>
        </div>
        <div className={`container mx-0 px-5 ${styles.formFooter}`}>
          <p className="text-white-50 text-center">
            Don't have an account?
            <Link style={{ textDecoration: "none" }} to="/register">
              <span className="fw-bolder text-light"> Register</span>
            </Link>
          </p>
        </div>
        <div className={`container mx-0 px-5 ${styles.formFooter}`}>
          <p className="text-white-50 text-center">
            Forgotten your password?
            <span className="fw-bolder text-light"> Recover password</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
