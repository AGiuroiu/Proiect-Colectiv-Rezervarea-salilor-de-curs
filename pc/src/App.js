import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Map from "./components/Map/Map";
import AboutUsPage from "./components/AboutUs/AboutUs";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin"; // Importă componenta Admin
import ParentComponent   from "./components/Admin/ParentComponent";
import "./App.css";

function App() {
  // Retrieve user state from local storage if it exists
  const storedUserState = localStorage.getItem("userstate");
  const [userstate, setUserState] = useState(
    storedUserState ? JSON.parse(storedUserState) : null
  );

  // Update user state and store it in local storage
  const updateUserState = (newUserState) => {
    setUserState(newUserState);
    localStorage.setItem("userstate", JSON.stringify(newUserState));
  };

  return (
    <div className="App">
      <Router>
        {userstate && <Navbar userstate={userstate} />}
        <Routes>
          {userstate && (
            <>
              <Route
                path="/profile"
                element={<Profile setUserState={updateUserState} />}
              />
              <Route path="/map" element={<Map />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<Admin />} /> // Folosește componenta Admin
              
            </>
          )}
          <Route
            path="/"
            element={<Login setUserState={updateUserState} />}
          />
          <Route path="/signup" element={<Register />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;