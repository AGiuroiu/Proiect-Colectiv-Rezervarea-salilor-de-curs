import React, { useEffect } from "react";
import "./Map.module.css";
import { Loader } from "@googlemaps/js-api-loader"

function Map() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`; // Replace YOUR_API_KEY with your actual API key
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
      className="map"
      style={{ width: "70%", height: "580px" }}
    ></div>
  );
}

export default Map;
