import React from "react";
import styles from "./AboutUs.module.css";

const AboutUsPage = () => {
  return (
    <div className={styles["about-us-container"]}>
      <h1 className={styles["heading"]}>About Us</h1>
      <p className={styles["paragraph"]}>We are a team of passionate individuals dedicated to creating innovative solutions.</p>
      <p className={styles["paragraph"]}>Our mission is to make a positive impact on the world through technology.</p>
    </div>
  );
};

export default AboutUsPage;
