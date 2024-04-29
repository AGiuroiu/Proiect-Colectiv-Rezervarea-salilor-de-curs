import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { ActionButtons } from "../ActionButtons";

function Map() {
  const [searchTerm, setSearchTerm] = useState(""); // State pentru a gestiona termenul de căutare introdus de utilizator

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCi0LN_kGISt-pvUiJXOJ96zsdoU3Prepw&libraries=places`; // Înlocuiește "YOUR_API_KEY" cu cheia ta API pentru Google Maps
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

    // Adaugă marker pe click pe hartă
    map.addListener("click", (event) => {
      addMarker(event.latLng, map);
    });

    // Caută locația când utilizatorul apasă Enter în inputul de căutare
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        searchLocation();
      }
    });
  }

  function addMarker(location, map) {
    new window.google.maps.Marker({
      position: location,
      map: map,
    });
  }

  // Funcție pentru a căuta locația specificată de utilizator
  function searchLocation() {
    // Obține locația introdusă de utilizator din input
    const location = document.getElementById("searchInput").value;

    // Dacă locația este validă, caută și afișează pe hartă
    if (location) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === "OK" && results[0]) {
          const map = new window.google.maps.Map(
            document.getElementById("map"),
            {
              center: results[0].geometry.location,
              zoom: 14,
            }
          );
          addMarker(results[0].geometry.location, map);
        } else {
          alert("Location not found");
        }
      });
    }
  }

  // Funcție pentru filtrare
  function handleFilter() {
    // Implementează logica pentru filtrare aici
    alert("Filter button clicked");
  }

  return (
    <div className={styles.mapContainer}>
      <div
        id="map"
        className={styles.map}
        style={{ width: "65%", height: "400px" }}
      ></div>
      <div className={styles.searchBar}>
        <input
          type="text"
          id="searchInput"
          className={styles.searchInput}
          placeholder="Search location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.searchButton} onClick={searchLocation}>
          Search
        </button>
      </div>
      <div className={styles.filterButtonContainer}>
        <button className={styles.filterButton} onClick={handleFilter}>
          Filter
        </button>
      </div>
    </div>
  );
}

export default Map;
