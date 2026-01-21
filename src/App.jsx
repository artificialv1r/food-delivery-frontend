import React from "react";
import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./core/layout/WelcomePage";
import Header from "./core/layout/Header";
import UserLoginForm from "./features/authentication/components/UserLoginForm";

function App() {
  const handleLoginSuccess = (response) => {
    console.log("User logged in:", response);
  };
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<UserLoginForm handleLoginSuccess={handleLoginSuccess} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;