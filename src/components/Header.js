import React from "react";
import "./Header.css";
import Img from "../Image/logo.png";
const Header = () => {
  return (
    <div className="header">
      <img src={Img} id="logo" alt="logo of the website" />
      <h1 id="titre">Save My FroggyDays</h1>
    </div>
  );
};

export default Header;
