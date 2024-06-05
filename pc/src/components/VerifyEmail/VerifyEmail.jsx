import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = ({ userstate }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const response = await axios.post("http://localhost:8000/verify-email", {
        email: userstate.Email,
        code: verificationCode,
      });

      if (response.data.message === "Verification successful") {
        setMessage("Verification successful!");
        navigate("/profile");
      } else {
        setMessage("Verification failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred during verification. Please try again.");
    }
  };

  return (
    <div>
      <h1>Verify Your Email</h1>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Enter verification code"
      />
      <button onClick={handleVerify}>Verify</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyEmail;
