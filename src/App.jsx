import React from "react";
import { BrowserRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Header from "./core/layout/Header";

function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;