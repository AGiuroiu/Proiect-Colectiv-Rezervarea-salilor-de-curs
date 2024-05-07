import React, { useEffect, useState, useRef } from "react";
import styles from "./Map.module.css";
import { ActionButtons } from "../ActionButtons";

function Map() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    loadMapScript();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  const loadMapScript = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCi0LN_kGISt-pvUiJXOJ96zsdoU3Prepw&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initializeMap;
    document.head.appendChild(script);
    };

  const initializeMap = () => {
    mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 45.763361655442004, lng: 21.220691404711896 },
      zoom: 14,
    });

    mapRef.current.addListener("click", handleMapClick);

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keypress", handleSearchKeyPress);
  };

  const handleMapClick = (event) => {
    addMarker(event.latLng);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      searchLocation();
    }
  };

  const fetchRooms = () => {
    fetch("http://localhost:8000/rooms")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
      })
      .catch((error) => console.error("Failed to fetch rooms:", error));
  };

  const addMarker = (location) => {
    const marker = new window.google.maps.Marker({
      position: location,
      map: mapRef.current,
    });

    markersRef.current.push(marker);
  };

  const searchLocation = () => {
    const location = document.getElementById("searchInput").value;

    if (location) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === "OK" && results[0]) {
          mapRef.current.setCenter(results[0].geometry.location);
          addMarker(results[0].geometry.location);
        } else {
          alert("Location not found");
        }
      });
    }
  };

  const handleFilter = () => {
    alert("Filter button clicked");
  };

  return (
    <div className={styles.mapContainer}>
      <div ref={mapContainerRef} className={styles.map} style={{ height: "400px", flex: 1 }}></div>
      <div className={styles.roomList}>
        <h2>Available Rooms</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room.RoomID} className={styles.room}>
              <strong>{room.RoomName}</strong>
              <br />
              Capacity: {room.Capacity}
              <br />
              Type: {room.Type}
              <br />
              Location: {room.Location}
              <br />
              Floor: {room.Floor}
              <br />
              Projector: {room.Projector ? "Yes" : "No"}
              <br />
              Other Options: {room.OtherOptions}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.mapContainer}>
        <div id="map" className={styles.map} style={{ width: "65%", height: "400px" }}></div>
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
    </div>
  );
}

export default Map;
