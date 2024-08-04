import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "../api/axios";
import Cookies from "js-cookie";
import CustomToastContainer, {
  errorToast,
  successToast,
} from "../layouts/Toast";
import useAuth from "../hooks/useAuth";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/joy/Chip";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import GoogleButton from "react-google-button";

const REACT_APP_GOOGLE_CLIENT_ID = import.meta.env
  .VITE_REACT_APP_GOOGLE_CLIENT_ID;
const BASE_BACKEND_URL = import.meta.env.VITE_DJANGO_APP_BASE_URL;

function Login() {
  const emailRef = useRef(null);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const [validated, setValidated] = useState();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [searchParams] = useSearchParams();

  const handleModalSuccessToast = (message) => {
    successToast(message);
  };

  useEffect(() => {
    if (searchParams.has("type")) {
      const type = searchParams.get("type");
      const error = searchParams.get("error");
      if (type === "oAuth") {
        errorToast(error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const redirectUri = "auth/social/google/";

    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const params = {
      response_type: "code",
      client_id: REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: `${BASE_BACKEND_URL}/${redirectUri}`,
      prompt: "select_account",
      access_type: "offline",
      scope,
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `${googleAuthUrl}?${urlParams}`;
  }, []);

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
        const response = await axios.post("/auth/login/", userInfo, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (response.status === 200) {
          Cookies.set("accessToken", response?.data?.description?.access);
          Cookies.set("refreshToken", response?.data?.description?.refresh);
          window.localStorage.setItem("isLoggedIn", true);
          setAuth((prev) => {
            return {
              ...prev,
              accessToken: response.data.description.access,
              refreshToken: response.data.description.refresh,
            };
          });
          navigate(from, { replace: true });
        }
      } catch (err) {
        const errResponse = err?.response;
        if (errResponse?.status === 404) {
          errorToast(errResponse?.data?.description);
        } else {
          errorToast("Server error");
        }
      }
    }
  };

  return (
    <>
      <div
        className={`container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center overflow-auto ${styles.LoginWrapper}`}
      >
        <div
          className={`container d-flex flex-column mx-0 mb-4 px-5 py-5 ${styles.formWrapper}`}
        >
          <div className="toast-container">
            <CustomToastContainer />
          </div>
          <p className="fs-3 mb-4">Login to your Account</p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email, or Username</Form.Label>
              <Form.Control
                type="text"
                ref={emailRef}
                value={userInfo.username}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
                className={`rounded-0 ${styles.inputFeilds}`}
                pattern={"^[\\S]{4,}$"}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid username or email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              controlId="formGroupPassword1"
              style={{ marginBottom: "2rem" }}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
                className={`rounded-0 ${styles.inputFeilds}`}
                pattern={"^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              className={`w-100 rounded-1 ${styles.LoginButton}`}
              style={{ marginBottom: "2rem" }}
            >
              Login
            </Button>
            <Divider style={{ marginBottom: "1rem" }}>
              <Chip variant="soft" color="neutral" size="sm">
                OR
              </Chip>
            </Divider>
            <div
              className={`container d-flex align-items-center justify-content-center`}
            >
              <GoogleButton
                label="Login with Google"
                type="dark"
                onClick={openGoogleLoginPage}
              />
            </div>
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
            <span onClick={handleShowModal} className="fw-bolder text-light">
              {" "}
              Recover password
            </span>
          </p>
        </div>
        <ForgotPasswordModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleModalSuccessToast={handleModalSuccessToast}
        />
      </div>
    </>
  );
}

export default Login;
