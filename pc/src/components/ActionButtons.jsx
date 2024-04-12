import React from "react";

// Componenta pentru butoanele de la baza paginii
export function ActionButtons() {
    return (
      <div className="action-buttons">
        <button className="search-btn">Search</button>
        <button className="filter-btn">Filter</button>
        <button className="book-btn">Book</button>
      </div>
    );
  }