import React, { useEffect, useState } from "react";
import styles from "./Admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin({ onAddRoom }) {
  const [roomData, setRoomData] = useState({
    latitude: "",
    longitude: "",
    capacity: "",
    type: "",
    name: "",
    location: "",
    floor: "",
    projector: "",
    otherOptions: ""
  });
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userState = JSON.parse(localStorage.getItem('userstate'));
    console.log('userState from localStorage:', userState);
  
    if (userState && userState.Role === 'admin') {
      setUserRole(userState.Role);
      setUserId(userState.UserID);
    } else {
      alert('Access denied. Admins only.');
      navigate('/map'); // Redirect to login if not admin
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleAddRoom = async () => {
    try {
      if (!userId) {
        throw new Error("User ID is required to add a room.");
      }

      const roomDataWithUser = { ...roomData, userRole, userId };

      if (typeof onAddRoom === 'function') {
        onAddRoom(roomDataWithUser);
      }

      const response = await axios.post("http://localhost:8000/rooms", roomDataWithUser, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201) {
        setRoomData({
          latitude: "",
          longitude: "",
          capacity: "",
          type: "",
          name: "",
          location: "",
          floor: "",
          projector: "",
          otherOptions: ""
        });
        console.log("Room added:", response.data);
      } else {
        throw new Error(response.data.message || "Failed to add room");
      }
    } catch (error) {
      console.error("Error adding room:", error.message);
      alert('Error adding room: ${error.message}');
    }
  };

  return (
    <div className={styles.adminContainer}>
      <h2>Add Room</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="latitude">Latitude:</label>
        <input type="text" id="latitude" name="latitude" value={roomData.latitude} onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="longitude">Longitude:</label>
        <input type="text" id="longitude" name="longitude" value={roomData.longitude} onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="capacity">Capacity:</label>
        <input type="text" id="capacity" name="capacity" value={roomData.capacity} onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="type">Type:</label>
        <select id="type" name="type" value={roomData.type} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="amfiteatru">Amfiteatru</option>
          <option value="intalniri">Întâlniri</option>
          <option value="laborator">Laborator</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={roomData.name} onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={roomData.location} onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="floor">Floor:</label>
        <input type="text" id="floor" name="floor" value={roomData.floor} onChange={handleChange} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="projector">Projector:</label>
        <select id="projector" name="projector" value={roomData.projector} onChange={handleChange}>
          <option value="">Select Projector</option>
          <option value="da">Da</option>
          <option value="nu">Nu</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="otherOptions">Other Options:</label>
        <input type="text" id="otherOptions" name="otherOptions" value={roomData.otherOptions} onChange={handleChange} />
      </div>
      <button onClick={handleAddRoom}>Add Room</button>
    </div>
  );
}

export default Admin;