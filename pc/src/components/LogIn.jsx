import React, { useState } from "react";
import "../style/LogIn.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Logo from "../logo/roomranger.png"; // Importă imaginea logo.png


const LogIn = () => {
    const [action, setAction] = useState("Login");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleActionChange = (newAction) => {
        setAction(newAction);
        setConfirmPassword(""); 
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        const regex = /^[0-9\b]+$/;
        if (value === "" || regex.test(value)) {
            setPhoneNumber(value);
        }
    };

    return (
        <div className="form-box">
            <div className="container2">
                <div className="header">
                    <div className="logo-container">
                        <img src={Logo} alt="Logo" className="logo" /> {/* Adaugă logo-ul */}
                    </div>
                </div>
                <div className="inputs">
                <div className="text">{action}</div>
                    <div className="underline"></div>
                    {action !== "Login" && (
                        <div className="input">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faUser} />

                        </div>
                    )}

                    {action !== "Login" && (
                        <div className="input">
                                <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faUser} />
        
                        </div>
                    )}

                    {action !== "Login" && (
                        <div className="input">
                            
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange} 
                            />
                            <FontAwesomeIcon icon={faPhone} />
                        </div>
                    )}

                    <div className="input">
                        <input type="email" placeholder="Email" name="" id="" />
                        <FontAwesomeIcon icon={faEnvelope} />

                    </div>
                    <div className="input">
                        <input type="password" placeholder="Password" name="" id="" />
                        <FontAwesomeIcon icon={faLock} />

                    </div>
                    {action === "Sign up" && (
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faLock} />

                        </div>
                    )}
                    {action !== "Sign up" && (
                        <div className="forgot-password">
                            Lost Password? <span>Click Here!</span>
                        </div>
                    )}
                    <div className="submit-container">
                        <div
                            className={action === "Login" ? "submit gray" : "submit"}
                            onClick={() => handleActionChange("Sign up")}
                        >
                            Sign Up
                        </div>
                        <div
                            className={action === "Sign Up" ? "submit gray" : "submit"}
                            onClick={() => handleActionChange("Login")}
                        >
                            Log In
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
