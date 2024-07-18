import React from "react";
import styles from "./Signup.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <div
        className={`container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center overflow-auto ${styles.signupWrapper}`}
      >
        <div
          className={`container d-flex flex-column mx-0 mb-4 px-5 py-5 ${styles.formWrapper}`}
        >
          <p className="fs-3 mb-4">Create your account</p>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                className={`rounded-0 ${styles.inputFeilds}`}
                placeholder="name@example.com"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                className={`rounded-0 ${styles.inputFeilds}`}
                placeholder="nightking"
                required
              />
              <Form.Control.Feedback type="invalid">
                Username must not contain whitespaces.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className={`rounded-0 ${styles.inputFeilds}`}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                className={`rounded-0 ${styles.inputFeilds}`}
                required
              />
              <Form.Control.Feedback type="invalid">
                Both password must match.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="py-3 d-inline-block align-items-center mb-4"
              controlId="formGroupCheckbox"
            >
              <Form.Check
                type="checkbox"
                id="flexCheckDefault"
                className={`rounded-1 ${styles.termsCheckbox}`}
                label={
                  <div className="ps-3 pe-3 text-muted fw-light">
                    <p>
                      To register with us please tick to agree to our
                      <span className="text-primary">
                        {" "}
                        Terms and Conditions
                      </span>
                    </p>
                  </div>
                }
              />
              <Form.Control.Feedback
                className="ps-3 pe-4 invalid-feedback"
                type="invalid"
              >
                Please agree with our terms and Condition.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Button
            type="submit"
            className={`w-100 rounded-1 ${styles.signUpButton}`}
          >
            Register
          </Button>
        </div>
        <div
          className={`container d-flex flex-column align-items-center mx-0 px-5 ${styles.formFooter}`}
        >
          <p className="text-white-50">
            Already have an account?
            <Link to="/">
              <span className="fw-bolder text-light"> Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
