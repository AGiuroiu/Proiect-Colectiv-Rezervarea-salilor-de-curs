import "./App.css";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Map from "./components/Map/Map";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [userstate, setUserState] = useState({});

  if (!(userstate && userstate._id)) {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login setUserState={setUserState} />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </Router>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route
            path="/profile"
            element={
              <Profile setUserState={setUserState} username={userstate.fname} />
            }
          ></Route>
          <Route path="/" element={<Map />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
