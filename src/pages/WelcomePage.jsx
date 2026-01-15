import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.scss"

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <nav className="navbar">
        <div className="navbar-title">
          <h2>Gozba na klik</h2>
        </div>
        <div className="navbar-buttons">
            <Link to="/register"><button type="button">Register</button></Link>
            <Link to="/login"><button type="button">Log in</button></Link>
        </div>
      </nav>

      <div className="welcome-main">
        <div className="content">
        <h4>Delicious food is just a few clicks away!</h4>
        <p>
          Order your favorite meals quickly and easily, straight from your phone or computer.
          Enjoy fast delivery and an effortless online experience. 
        </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
