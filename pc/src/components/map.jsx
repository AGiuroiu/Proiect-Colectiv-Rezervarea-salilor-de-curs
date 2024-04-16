import React, { useEffect } from 'react';
import './style/Main.css'

export function Map() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD3pcEWmYaPqKLCEGeu8fuZ5fFvSVvWeC8
    &libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function initializeMap() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 45.75643334548602,  lng: 21.228483079011387 },
      zoom: 12
    });

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