import React, { useEffect, useState, useRef } from "react";
import styles from "./Map.module.css";

function Map() {
  const [rooms, setRooms] = useState([]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // To store the map instance
  const markersRef = useRef([]); // To store the markers

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCi0LN_kGISt-pvUiJXOJ96zsdoU3Prepw&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 45.763361655442004, lng: 21.220691404711896 },
      zoom: 14,
    });
  };

  useEffect(() => {
    fetch("http://localhost:8000/rooms")
      .then(response => response.json())
      .then(data => {
        setRooms(data);
      })
      .catch(error => console.error("Failed to fetch rooms:", error));
  }, []);

  useEffect(() => {
    if (mapRef.current && rooms.length) {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Create new markers
      rooms.forEach(room => {
        const marker = new window.google.maps.Marker({
          position: { lat: room.latitude, lng: room.longitude },
          map: mapRef.current,
          title: room.RoomName,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><strong>${room.RoomName}</strong><br>Capacity: ${room.Capacity}<br>Type: ${room.Type}</div>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(mapRef.current, marker);
        });

        markersRef.current.push(marker); // Store marker reference
      });
    }
  }, [rooms]); // Depend on rooms

  return (
    <div className={styles.mapContainer}>
      <div ref={mapContainerRef} className={styles.map} style={{ height: "400px", flex: 1 }}></div>
      <div className={styles.roomList}>
        <h2>Available Rooms</h2>
        <ul>
          {rooms.map(room => (
            <li key={room.RoomID} className={styles.room}>
              <strong>{room.RoomName}</strong><br/>
              Capacity: {room.Capacity}<br/>
              Type: {room.Type}<br/>
              Location: {room.Location}<br/>
              Floor: {room.Floor}<br/>
              Projector: {room.Projector ? 'Yes' : 'No'}<br/>
              Other Options: {room.OtherOptions}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Map;
