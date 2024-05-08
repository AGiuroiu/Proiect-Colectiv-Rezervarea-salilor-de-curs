import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./AboutUs.module.css";
import Logo0 from "../../images/medi.jpg";
import Logo1 from "../../images/logoUvt.jpg";
import Logo2 from "../../images/logoUpt.jpg";

const AboutUsPage = () => {
  return (
    <div className={styles["page"]}>
    <div className={styles["about-us-container"]}>
      <h1 className={styles["heading"]}>About Us</h1>
      <p className={styles["paragraph"]}>With our assistance, you can reserve a classroom at any university. </p>

      <Carousel autoPlay showThumbs={false} interval={3000} stopOnHover={false} infiniteLoop={true}>
        <div>
          <img src={Logo0} alt="Logo" className={styles.logoUm} />
        </div>
        <div>
          <img src={Logo1} alt="Logo" className={styles.logo} />
        </div>
        <div>
          <img src={Logo2} alt="Logo" className={styles.logo} />
        </div>
      </Carousel>
      <p className={styles["paragraph"]}>Our platform offers you the convenience of booking classrooms from various universities in a simple and efficient manner. </p>
      <p className={styles["paragraph"]}>Through our service, we aim to provide you with a seamless experience, allowing you to identify and reserve classrooms that suit your needs. Regardless of the university you choose, we are here to facilitate your access to the necessary facilities for conducting your educational activities in an organized and hassle-free manner </p>

    </div>
    </div>
  );
};

export default AboutUsPage;