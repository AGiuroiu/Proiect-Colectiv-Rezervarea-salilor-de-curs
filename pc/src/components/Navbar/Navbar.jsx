import React from "react";
import Logo from "../../images/logo.png";
import styles from "./Navbar.module.css"; 

const Navbar = () => {
  return (
    <div className={styles.navbar}> 
      {<div className={styles["logo-container"]}> 
        <img src={Logo} alt="Logo" className={styles.logo} /> 
      </div>}
      <div className={styles["nav-items"]}> 
        <a href="/home">Home</a>
        <a href="/map">Map</a>
        <a href="/about-us">About Us</a>
        <a href="/profile">Profile</a>
      </div>
    </div>
  );
};

export default Navbar;
