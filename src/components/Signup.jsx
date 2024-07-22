import React, { useEffect, useState, useRef } from "react";
import styles from "./Signup.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import CustomToastContainer from "../layouts/Toast";
import { successToast, errorToast } from "../layouts/Toast";
import { getFirstObjectKey, getFirstObjectPair } from "../utils/object";

function Signup() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const emailRef = useRef(null);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      setValidated(false);
      try {
        const response = await axios.post("/auth/register/", userInfo, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 201) {
          successToast("Account created successfully");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (err) {
        const errResponse = err?.response;
        if (errResponse?.status === 400) {
          const errorMsg = errResponse?.data?.message;
          if (errorMsg === "Integrity Error") {
            const fieldName = getFirstObjectKey(errResponse?.data?.description);
            errorToast(`Account with this ${fieldName} already exist`);
          } else if (errorMsg === "Validation error") {
            const [fieldName, description] = getFirstObjectPair(
              errResponse?.data?.description
            );
            errorToast(`${fieldName} : ${description}`);
          }
        }
      }
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setIsMatchPassword(userInfo.password === userInfo.confirmPassword);
  }, [userInfo.password, userInfo.confirmPassword]);

  const showMatchPasswordError = validated && !isMatchPassword;

  return (
    <>
      <div
        className={`container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center overflow-auto ${styles.signupWrapper}`}
      >
        <div
          className={`container shadow d-flex flex-column mx-0 mb-4 px-5 py-5 ${styles.formWrapper}`}
        >
          <div className="toast-container">
            <CustomToastContainer />
          </div>
          <p className="fs-3 mb-4">Create your account</p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                className={`rounded-0 ${styles.inputFeilds}`}
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
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
                value={userInfo.username}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
                placeholder="nightking"
                pattern={"^[\\S]{4,}$"}
                required
              />
              <Form.Control.Feedback type="invalid">
                Username must be minimum 4 characters with no whitespaces.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
                className={`rounded-0 ${styles.inputFeilds}`}
                required
                pattern={"^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"}
                aria-describedby="passwordHelpBlock"
              />
              <Form.Text id="passwordHelpBlock" className="text-muted">
                Your password must be 8-20 characters long, include letters and
                numbers
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please enter a valid password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={userInfo.confirmPassword}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, confirmPassword: e.target.value })
                }
                className={`rounded-0 ${styles.inputFeilds}`}
                pattern={"^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"}
                isInvalid={showMatchPasswordError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {!isMatchPassword ? (
                  <p>Both password must match.</p>
                ) : (
                  <p>Please enter a valid password.</p>
                )}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="form-check mb-4">
              <input
                className={`form-check-input rounded-1 ${styles.termsCheckbox}`}
                type="checkbox"
                value=""
                id="flexCheckDefault"
                required
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                <p className="ps-3 pe-3 text-muted fw-light">
                  To register with us please tick to agree to our
                  <span className="text-primary"> Terms and Conditions</span>
                </p>
              </label>
              <div className="ps-3 pe-4 invalid-feedback">
                Please agree with our terms and Condition.
              </div>
            </div>
            <Button
              type="submit"
              className={`w-100 rounded-1 ${styles.signUpButton}`}
            >
              Register
            </Button>
          </Form>
        </div>
        <div
          className={`container d-flex flex-column align-items-center mx-0 px-5 ${styles.formFooter}`}
        >
          <p className="text-white-50">
            Already have an account?
            <Link style={{ textDecoration: "none" }} to="/">
              <span className="fw-bolder text-light"> Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
