import React, { useEffect, useState } from "react";
import axios from "axios";
import basestyle from "../Base.module.css";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = ({ setUserState }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserState = JSON.parse(localStorage.getItem("userstate"));
        if (storedUserState && storedUserState.UserID) {
          const userRes = await axios.get(`http://localhost:8000/user/${storedUserState.UserID}`);
          setUserInfo(userRes.data);

          const reservationsRes = await axios.get(`http://localhost:8000/reservations/${storedUserState.UserID}`);
          setReservations(reservationsRes.data);
        } else {
          console.error("User ID not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    setUserState(null);
    localStorage.removeItem("userstate");
    navigate("/");
  };

  return (
    <div className={styles.profileContainer}>
      <h1>Welcome {userInfo.Username}!</h1>
      <div className={styles.userInfo}>
        <h2>User Information</h2>
        <p>Name: {userInfo.Username}</p>
        <p>Email: {userInfo.Email}</p>
        <p>Role: {userInfo.Role}</p>
      </div>
      <div className={styles.reservationsContainer}>
        <h2>Your Reservations</h2>
        <div className={styles.reservationsGrid}>
          <div className={styles.gridHeader}>
            <div>Room</div>
            <div>Start Time</div>
            <div>End Time</div>
            <div>Status</div>
          </div>
          {reservations.map((reservation) => (
            <div key={reservation.ReservationID} className={styles.gridRow}>
              <div>{reservation.RoomName}</div>
              <div>{new Date(reservation.StartTime).toLocaleString()}</div>
              <div>{new Date(reservation.EndTime).toLocaleString()}</div>
              <div>{reservation.Status}</div>
            </div>
          ))}
        </div>
      </div>
      <button className={basestyle.button_common} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
