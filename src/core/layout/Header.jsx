import React from "react";
import "../layout.scss";
import {Link} from "react-router-dom";

const Header = ({ onLoginClick, onRegisterClick, onLogoutClick, isLoggedIn }) => {
  return (
    <header>
      <nav className="navbar">
          <Link to="/" className="navbar-title">
              <h2>Gozba na klik</h2>
          </Link>
        
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