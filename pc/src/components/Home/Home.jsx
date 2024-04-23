import React from "react";
import Navbar from "./components/Navbar/Navbar";

const Home = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        <h1>Welcome to our website!</h1>
        <p>This is the home page of our application.</p>
        <p>Feel free to explore and learn more about us.</p>
        <Map />
        <AboutUsPage />
      </main>
    </div>
  );
};

export default Home;
