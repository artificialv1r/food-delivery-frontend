import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./core/layout/Header";
import Modal from "./features/authentication/components/Modal";
import RegisterForm from "./features/authentication/components/UserRegistrationForm";
import WelcomePage from "./core/layout/WelcomePage";

function App() {
  const [authModal, setAuthModal] = useState(null); // "login" | "register" | null

  const openRegister = () => setAuthModal("register");
  const closeModal = () => setAuthModal(null);

  return (
    <BrowserRouter>
      <Header
        onRegisterClick={openRegister}
      />

      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>

      <Modal isOpen={!!authModal} onClose={closeModal}>
        {authModal === "register" && <RegisterForm onSuccess={closeModal} />}
      </Modal>
    </BrowserRouter>
  );
}

export default App;