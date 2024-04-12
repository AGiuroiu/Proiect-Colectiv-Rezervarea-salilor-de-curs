import React from "react";
import Logo from '../images/roomranger.png';

// Componenta pentru bara de navigare
export function Navbar() {
    return (
      <div className="navbar">
      <div className="logo-container">
           <img src={Logo} alt="Logo" className="logo" /> 
            </div>      
        <div className="nav-items">
          <a href="/">Home</a>
          <a href="/map">Map</a>
          <a href="/about-us">About Us</a>
          <a href="/profile">Profile</a>
        </div>
      </div>
    );
  }