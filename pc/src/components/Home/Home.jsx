import React from "react";
import { Button } from "@material-ui/core";
import styles from "./Home.module.css";
import TimiMapImage from "../../images/timiMap.jpg";
import Amfiteatru from "../../images/amfiteatru.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles directly
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  return (
    <div className={styles.Home}>
    <h1 className={styles.WELCOME}>Hello world!</h1> 
      <div className={styles.buttonContainer}>
        <Carousel autoPlay showThumbs={false} interval={3000} stopOnHover={false} infiniteLoop={true}>
          <Button variant="contained" color="primary" className={styles.button}>
            <div className={styles.buttonContent}>
              <span>Map</span>
              <img
                src={TimiMapImage}
                alt="TimiMap"
                className={styles.mapImage}
              />{" "}
            </div>
          </Button>
          <Button variant="contained" color="primary" className={styles.button}>
            <div className={styles.buttonContent}>
              <span>Rooms</span>
              <img
                src={Amfiteatru}
                alt="Amfiteatru"
                className={styles.mapImage}
              />{" "}
            </div>
          </Button>
          <Button variant="contained" color="primary" className={styles.button}>
            Something
          </Button>
        </Carousel>
      </div>
      <main></main>
    </div>
  );
};

export default Home;
