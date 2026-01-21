import React from "react";
import { Link } from "react-router-dom";
import "../layout.scss";

const WelcomePage = () => {
  return (
    <div className="welcome-page">
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
