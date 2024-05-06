import React from "react";
import basestyle from "../Base.module.css";
import { useNavigate } from "react-router-dom";

const Profile = ({ setUserState, username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user state
    setUserState(null);
    // Navigate to the login page
    navigate("/");
  };

  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
      <button className={basestyle.button_common} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
