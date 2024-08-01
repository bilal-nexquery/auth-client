import React, { useEffect, useRef, useState } from "react";
import styles from "./ResetPassword.module.css";
import { useNavigate, useParams } from "react-router-dom";
import CustomToastContainer, {
  errorToast,
  successToast,
} from "../layouts/Toast";
import { Button, Form } from "react-bootstrap";
import axios from "../api/axios";
import { getFirstObjectPair } from "../utils/object";
import InvalidResetPasswordLink from "./InvalidResetPasswordLink";
import { CircularProgress } from "@mui/joy";

function ResetPassword() {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const navigate = useNavigate();

  const { token } = useParams();

  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [invalidLinkMsg, setInvalidLinkMsg] = useState("");

  useEffect(() => {
    const validateLink = async () => {
      try {
        const response = await axios.get(
          `auth/validate/reset-password/${token}/`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setShowContent(true);
      } catch (error) {
        const errResponse = error?.response;
        if (errResponse?.status === 400) {
          setInvalidLinkMsg(errResponse?.data?.description[0]);
        } else if (errResponse?.status === 404) {
          setInvalidLinkMsg(errResponse?.data?.description);
        } else {
          setInvalidLinkMsg("Server error");
        }
        setShowContent(false);
      }
      setShowLoader(false);
    };
    validateLink();
  }, []);

  useEffect(() => {
    setIsMatchPassword(password === confirmPassword);
  }, [password, confirmPassword]);

  const showMatchPasswordError = validated && !isMatchPassword;

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || !isMatchPassword) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      setValidated(false);
      try {
        const response = await axios.post(
          `/auth/reset-password/${token}/`,
          {
            password: password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response?.status === 200) {
          successToast(response?.data?.description);
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 1000);
        }
      } catch (error) {
        const errResponse = error?.response;
        if (errResponse?.status === 400) {
          if (errResponse?.data?.message === "Validation error") {
            if (errResponse?.data?.description.hasOwnProperty("password")) {
              const [fieldName, description] = getFirstObjectPair(
                errResponse?.data?.description
              );
              errorToast(`${fieldName} : ${description}`);
            } else {
              errorToast(errResponse?.data?.description[0]);
            }
          } else {
            errorToast("Server error");
          }
        } else if (errResponse?.status === 404) {
          errorToast(errResponse?.data?.description);
        } else {
          errorToast("Server error");
        }
      }
    }
  };

  return (
    <>
      {showLoader ? (
        <div
          className={`container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center overflow-auto ${styles.ResetPasswordWrapper}`}
        >
          <CircularProgress variant="solid" size="lg" />{" "}
        </div>
      ) : showContent ? (
        <div
          className={`container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center overflow-auto ${styles.ResetPasswordWrapper}`}
        >
          <div
            className={`container d-flex flex-column mx-0 mb-4 px-5 py-5 ${styles.formWrapper}`}
          >
            <div className="toast-container">
              <CustomToastContainer />
            </div>
            <p className="fs-3 mb-4">Change your Account password</p>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formGroupPassword1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`rounded-0 ${styles.inputFeilds}`}
                  pattern={"^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"}
                  required
                />
                <Form.Text id="passwordHelpBlock" className="text-muted">
                  Your password must be 8-20 characters long, include letters
                  and numbers
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                style={{ marginBottom: "2.5rem" }}
                controlId="formGroupPassword2"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              <Button
                type="submit"
                className={`w-100 rounded-1 ${styles.ChangePasswordButton}`}
              >
                Change password
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <InvalidResetPasswordLink message={invalidLinkMsg} />
      )}
    </>
  );
}

export default ResetPassword;
