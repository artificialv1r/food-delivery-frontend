
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRegister from "./features/authentication/AuthRegister";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to Dashboard!</h1>
      <p>You are logged in.</p>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<AuthRegister />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
