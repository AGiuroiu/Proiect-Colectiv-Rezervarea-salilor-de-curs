import React, { useEffect } from "react";
import styles from "./Map.module.css"; 
import { ActionButtons } from "../ActionButtons";
//import Datepicker from 'react-datepicker';

function Map() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCi0LN_kGISt-pvUiJXOJ96zsdoU3Prepw&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function initializeMap() {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 45.763361655442004, lng: 21.220691404711896 },
      zoom: 14,
    });

    // Add marker on map click
    map.addListener("click", (event) => {
      addMarker(event.latLng, map);
    });
  }

  function addMarker(location, map) {
    new window.google.maps.Marker({
      position: location,
      map: map,
    });
  }

  return (
    <div
      id="map"
      className={styles.map} 
      style={{ width: "65%", height: "400px" }}
    >
      <div className="Calendar"></div>
    </div>
    );
}

export default Map;
