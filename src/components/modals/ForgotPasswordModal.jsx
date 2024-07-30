import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "@mui/joy/Button";
import styles from "./ForgotPasswordModal.module.css";
import ModalDialog from "@mui/joy/ModalDialog";
import Modal from "@mui/joy/Modal";
import DialogTitle from "@mui/joy/DialogTitle";
import CircularProgress from "@mui/joy/CircularProgress";
import axios from "../../api/axios";

const ForgotPasswordModal = ({
  showModal,
  handleCloseModal,
  handleModalSuccessToast,
}) => {
  const [username, setUsername] = useState("");
  const [validated, setValidated] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setLoader(false);
      setErrMsg("");
    } else {
      event.preventDefault();
      setValidated(false);
      setLoader(true);
      try {
        const response = await axios.post(
          "/auth/forgot-password/",
          {
            username: username,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status === 201) {
          setLoader(false);
          handleCloseModal();
          handleModalSuccessToast(response?.data?.description);
        }
      } catch (error) {
        const errResponse = error?.response;
        if (errResponse?.status === 404) {
          setLoader(false);
          setValidated(true);
          setErrMsg(errResponse?.data?.description);
        }
      }
    }
  };

  return (
    <>
      <Modal
        open={showModal}
        onClose={() => {
          setValidated(false);
          setErrMsg("");
          setLoader(false);
          handleCloseModal();
        }}
      >
        <ModalDialog>
          <DialogTitle>Enter your email to reset your password.</DialogTitle>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="mb-3">Email, or Username</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrMsg("");
                }}
                className={`rounded-0 mb-2 ${styles.inputFeilds}`}
                isInvalid={errMsg}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errMsg ? errMsg : "Please enter a valid username or email."}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              className={`w-100 rounded-1 ${styles.verifyButton}`}
            >
              {loader ? (
                <CircularProgress thickness={4} variant="solid" size="md" />
              ) : (
                "Verify"
              )}
            </Button>
          </Form>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
