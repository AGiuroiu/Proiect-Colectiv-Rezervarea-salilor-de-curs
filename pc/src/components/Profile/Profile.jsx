import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = ({ setUserState, username, userEmail }) => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch user reservations when the component mounts
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/reservations/${userEmail}`);
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        // Handle error here
      }
    };
    fetchReservations();
  }, [userEmail]);

  const handleLogout = () => {
    // Clear user state
    setUserState(null);
    // Navigate to the login page
    navigate("/");
  };

  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
      <h2>Your Reservations:</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {/* Display reservation details */}
            {reservation.startTime} - {reservation.endTime}
          </li>
        ))}
      </ul>
      <button className={basestyle.button_common} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
