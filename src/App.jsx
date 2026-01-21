import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useState, useEffect} from "react";
import Header from "./core/layout/Header";
import Modal from "./features/authentication/components/Modal";
import UserLoginForm from "./features/authentication/components/UserLoginForm";
import WelcomePage from "./core/layout/WelcomePage";
import { loginUser } from "./features/authentication/services/authService";

function App() {
  const [authModal, setAuthModal] = useState(null);
  const [loginError, setLoginError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [user, setUser] = useState (null);

  useEffect (()=> {
    const storedUser = localStorage.getItem ('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const openLogin = () => {
    setAuthModal("login");
    setLoginError(null);
  };
  
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

      const userData = {   
      id: response.id, 
      username: response.username,  
      role: response.role 
      };

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      closeModal();
      
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(error.response?.data || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Header 
      onLoginClick={openLogin}
      onLogoutClick={handleLogout} 
      isLoggedIn={!!user}
      />

      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>

      <Modal isOpen={!!authModal} onClose={closeModal}>
        {authModal === "login" && (
          <UserLoginForm 
            onSubmit={handleLogin}
            error={loginError}
            isLoading={isLoading}
          />
        )}
      </Modal>
    </BrowserRouter>
  );
}

export default App;