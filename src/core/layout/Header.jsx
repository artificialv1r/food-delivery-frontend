import React from "react";
import { Link } from "react-router-dom";
import "../layout.scss";

const Header = ({ onLoginClick, onRegisterClick, onLogoutClick, isLoggedIn }) => {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-title">
            <h2>Gozba na klik</h2>
        </div>
        <div className="navbar-buttons">
          {isLoggedIn ? (
            <button onClick={onLogoutClick}>Log out</button>
          ) : (
            <>
            <button onClick={onLoginClick}>Log in</button>
            <button onClick={onRegisterClick}>Register</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;