import React from "react";
import "../layout.scss";

const Header = ({ onLoginClick, onRegisterClick }) => {
  return (
    <header>
      <nav className="navbar">
        <h2>Gozba na klik</h2>

        <div className="navbar-buttons">
          <button onClick={onLoginClick}>Log in</button>
          <button onClick={onRegisterClick}>Register</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;