import React, { useState } from "react";
import styles from "./RoomModal.module.css";

function RoomModal({ room, onClose }) {
  const [reservationData, setReservationData] = useState({
    userId: "1", // Add logic to get the user ID
    roomId: room.RoomID,
    startTime: "", // Add logic to select start time
    endTime: "", // Add logic to select end time
    status: "confirmat", // Assuming it's confirmed by default
    comments: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationData)
      });

      if (response.ok) {
        // Reservation successful, close the modal
        onClose();
      } else {
        // Reservation failed, display error message
        const errorMessage = await response.text();
        console.error("Reservation failed:", errorMessage);
        // Handle error (e.g., display error message to the user)
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{room.RoomName}</h2>
        <p>Capacity: {room.Capacity}</p>
        <p>Type: {room.Type}</p>
        <p>Location: {room.Location}</p>
        <p>Floor: {room.Floor}</p>
        <p>Projector: {room.Projector ? "Yes" : "No"}</p>
        <p>Other Options: {room.OtherOptions}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Start Time:
            <input type="datetime-local" name="startTime" value={reservationData.startTime} onChange={handleChange} required />
          </label>
          <label>
            End Time:
            <input type="datetime-local" name="endTime" value={reservationData.endTime} onChange={handleChange} required />
          </label>
          <label>
            Comments:
            <textarea name="comments" value={reservationData.comments} onChange={handleChange}></textarea>
          </label>
          <button type="submit" className={styles.bookButton}>Book</button>
        </form>
      </div>
    </div>
  );
}

export default RoomModal;
