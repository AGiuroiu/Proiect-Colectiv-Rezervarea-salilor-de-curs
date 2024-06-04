import React, { useState } from "react";
import Admin from "./Admin";
import Map from "../Map/Map";
function ParentComponent() {
  const [markers, setMarkers] = useState([]);

  const handleAddMarker = (markerData) => {
    setMarkers([...markers, markerData]);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <Admin onAddMarker={handleAddMarker} />
      <Map markers={markers} />
    </div>
  );
}

export default ParentComponent;