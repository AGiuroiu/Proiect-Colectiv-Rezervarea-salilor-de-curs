import "./Map.module.css";
import React, { useEffect } from "react";

function Map() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD3pcEWmYaPqKLCEGeu8fuZ5fFvSVvWeC8&libraries=places`;
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

    const marker = new window.google.maps.Marker({
      position: { lat: -34.397, lng: 150.644 },
      map: map,
      title: "Marker",
    });
  }

  return (
    <div
      id="map"
      className="map"
      style={{ width: "70%", height: "580px" }}
    ></div>
  );
}

export default Map;
