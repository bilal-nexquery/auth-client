import React from "react";
import { useNavigate } from "react-router-dom";

function InvalidResetPasswordLink({ message }) {
  const navigate = useNavigate();

  return (
    <section
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f5f7f8" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center d-flex justify-content-center align-items-center flex-column">
              <h2 className="gap-2 mb-4">
                <span className="display-1 fw-bold">4</span>
                <i className="bi bi-exclamation-circle-fill text-danger display-4"></i>
                <span className="display-1 fw-bold bsb-flip-h">0</span>
                <i className="bi bi-exclamation-circle-fill text-danger display-4"></i>
                <span className="display-1 fw-bold bsb-flip-h">4</span>
              </h2>
              <h3 className="h2 mb-3">Oops!</h3>
              <p className="mb-5">{message}</p>
              <button
                className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0"
                onClick={() => navigate("/login", { replace: true })}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InvalidResetPasswordLink;
