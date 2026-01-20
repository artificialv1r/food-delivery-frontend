import React from "react";
import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./core/layout/WelcomePage";
import Header from "./core/layout/Header";
import AuthRegister from "./features/authentication/AuthRegister";

function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<AuthRegister />} />
          <Route path="*" element={<AuthRegister />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
