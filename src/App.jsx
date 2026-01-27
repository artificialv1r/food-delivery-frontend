import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./core/layout/Header";
import Modal from "./features/authentication/components/Modal";
import UserLoginForm from "./features/authentication/components/UserLoginForm";
import RegisterForm from "./features/authentication/components/UserRegistrationForm";
import WelcomePage from "./core/layout/WelcomePage";
import { loginUser } from "./features/authentication/services/authService";
import AdminUsers from "./features/admin/components/AdminUsers";

function App() {
  const [authModal, setAuthModal] = useState(null); // "login" | "register" | null
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openLogin = () => {
    setAuthModal("login");
    setLoginError(null);
  };

  const openRegister = () => setAuthModal("register");

  const closeModal = () => {
    setAuthModal(null);
    setLoginError(null);
  };

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await loginUser(credentials);
      console.log("Login successful:", response);

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({  
        id: response.id,
        username: response.username,
        role: response.role
      }));

      closeModal();
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(error.response?.data || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <Header onLoginClick={openLogin} onRegisterClick={openRegister} />

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>

      <Modal isOpen={!!authModal} onClose={closeModal}>
        {authModal === "login" && (
          <UserLoginForm 
            onSubmit={handleLogin}
            error={loginError}
            isLoading={isLoading}
          />
        )}
        {authModal === "register" && <RegisterForm onSuccess={closeModal} />}
      </Modal>
    </BrowserRouter>
  );
}

export default App;
