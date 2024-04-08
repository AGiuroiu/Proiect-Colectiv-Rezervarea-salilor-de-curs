import React, { useEffect } from 'react';
import './App.css'; // Asumând că stilurile sunt definite în App.css
import Logo from './roomranger.png';

// Componenta pentru bara de navigare
function Navbar() {
  return (
    <div className="navbar">
    <div className="logo-container">
         <img src={Logo} alt="Logo" className="logo" /> 
          </div>      
      <div className="nav-items">
        <a href="/">Home</a>
        <a href="/map">Map</a>
        <a href="/about-us">About Us</a>
        <a href="/profile">Profile</a>
      </div>
    </div>
  );
}

// Componenta pentru harta
function Map() {
  useEffect(() => {
    // Crează un element <script> pentru a încărca Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD3pcEWmYaPqKLCEGeu8fuZ5fFvSVvWeC8
    &libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      // Curăță scriptul încărcat când componenta este demontată
      document.body.removeChild(script);
    };
  }, []);

  function initializeMap() {
    // Inițializează harta
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 45.75643334548602,  lng: 21.228483079011387 },
      zoom: 12
    });

    // Adaugă marker
    const marker = new window.google.maps.Marker({
      position: { lat: 45.75643334548602, lng: 21.228483079011387 },
      map: map,
      title: 'Marker'
    });
  }

  return (
    <div id="map" className="map" style={{ width: '100%', height: '400px',  }}></div>
  );
}

export { Map };

// Componenta pentru butoanele de la baza paginii
function ActionButtons() {
  return (
    <div className="action-buttons">
      <button className="search-btn">Search</button>
      <button className="filter-btn">Filter</button>
      <button className="book-btn">Book</button>
    </div>
  );
}

// Componenta principală App care leagă totul împreună
function App() {
  return (
    <div className="App">
      <Navbar />
      <Map />
      <ActionButtons />
    </div>
  );
}

export default App; 