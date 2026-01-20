import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../features/authentication/components/Modal";
import RegisterForm from "../../features/authentication/components/UserRegistrationForm";
import "../layout.scss";

const Header = () => {

     const [showModal, setShowModal] = useState(false);
    
      const handleRegister = (data) => {
        console.log("Registered user:", data);
    // Nakon uspešne registracije, zatvori modal
        setShowModal(false);
      };

  return (
    <header>
        <nav className="navbar">
            <div className="navbar-title">
                <h2>Gozba na klik</h2>
            </div>
            <div className="navbar-buttons">
                <button className="open-modal-btn" 
          onClick={() => setShowModal(true)}>Register</button>
                <Link to="/login"><button type="button">Log in</button></Link>
            </div>
        </nav>

              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className="container1">
                  <div className="register">
                    <h1>Create new account</h1>
                    <RegisterForm handleRegister={handleRegister} />
                  </div>
                  <div className="image-side"></div>
                </div>
              </Modal>
    </header>
    );
};

export default Header;