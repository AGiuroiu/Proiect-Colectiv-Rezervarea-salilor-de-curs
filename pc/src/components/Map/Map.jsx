import React, { useEffect, useState, useRef } from "react";
import styles from "./Map.module.css";
import Modal from "../RoomModal/RoomModal.js"; // Import the Modal component

function Map() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const [filterOption, setFilterOption] = useState("name"); // Default filter option
  const [selectedRoom, setSelectedRoom] = useState(null); // State for selected room
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // To store the map instance
  const markersRef = useRef([]); // To store the markers
  const searchInputRef = useRef(null); // Reference for the search input field

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

        marker.addListener("click", () => {
          handleRoomClick(room); // Pass room data to the click handler
        });

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
  }, [rooms]); // Depend on rooms

  const handleSearch = () => {
    const input = searchInputRef.current.value;

    // Use Google Maps Places Autocomplete API to search for locations
    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        const firstPrediction = predictions[0];
        const placeId = firstPrediction.place_id;

        // Use Google Maps Geocoder to get the coordinates of the selected place
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ placeId }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
            const location = results[0].geometry.location;
            mapRef.current.setCenter(location);
          } else {
            console.error("Geocode was not successful for the following reason: " + status);
          }
        });
      }
    });
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const filteredRooms = () => {
    switch (filterOption) {
      case "name":
        return rooms.sort((a, b) => a.RoomName.localeCompare(b.RoomName));
      case "capacity":
        return rooms.sort((a, b) => a.Capacity - b.Capacity);
      case "type":
        return rooms.sort((a, b) => a.Type.localeCompare(b.Type));
      // Add more cases for other filter options
      default:
        return rooms;
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapAndRoomListContainer}>
        <div ref={mapContainerRef} className={styles.map}></div>
        <div className={styles.roomList}>
          <h2>Available Rooms</h2>
          <ul>
            {filteredRooms().map(room => (
              <li key={room.RoomID} className={styles.room} onClick={() => handleRoomClick(room)}>
                <strong>{room.RoomName}</strong><br/>
                Capacity: {room.Capacity}<br/>
                Type: {room.Type}<br/>
                Location: {room.Location}<br/>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.searchAndFilterContainer}>
        <div className={styles.searchContainer}>
          <input ref={searchInputRef} type="text" placeholder="Search location..." />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className={styles.filterContainer}>
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="name">Name</option>
            <option value="capacity">Capacity</option>
            <option value="type">Type</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      {/* Render modal conditionally */}
      {showModal && selectedRoom && (
        <Modal room={selectedRoom} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Map;