import React from "react";
import { Link } from "react-router-dom";
import "../layout.scss";

const Header = () => {
  return (
    <header>
        <nav className="navbar">
            <div className="navbar-title">
                <h2>Gozba na klik</h2>
            </div>
            <div className="navbar-buttons">
                <Link to="/register"><button type="button">Register</button></Link>
                <Link to="/login"><button type="button">Log in</button></Link>
            </div>
        </nav>
    </header>
    );
};

export default Header;