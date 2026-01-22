import React, { useState } from "react";
import RegisterForm from "./components/UserRegistrationForm";
import Modal from "./components/Modal";
import "./authentication.scss";

const AuthRegister = () => {
  const [showModal, setShowModal] = useState(false);

  const handleRegister = (data) => {
// Nakon uspešne registracije, zatvori modal
    setShowModal(false);
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Wellcome</h1>
        <p>Create your new account!</p>
        <button 
          className="open-modal-btn" 
          onClick={() => setShowModal(true)}
        >
          Register
        </button>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="container1">
          <div className="register">
            <h1>Create new account</h1>
            <RegisterForm handleRegister={handleRegister} />
          </div>
          <div className="image-side"></div>
        </div>
      </Modal>
    </div>
  );
};

export default AuthRegister;