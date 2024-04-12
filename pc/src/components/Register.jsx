import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Logo from "../logo/roomranger.png";

const Register = ({ toggleAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Logica de înregistrare aici
    console.log("Registering with:", email, password);
  };

  return (
    <div className="form-box">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="container2">
        <div className="header">
          <div className="text">Register</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className="submit-container">
            <div className="submit" onClick={handleRegister}>
              Sign Up
            </div>
            <div className="toggle-auth" onClick={toggleAuthMode}>
              Already have an account? Log In
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;