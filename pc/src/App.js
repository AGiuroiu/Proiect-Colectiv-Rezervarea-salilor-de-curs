import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importă Routes și Route
import LogIn from './components/LogIn';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<LogIn />} /> {/* Definiția rutei pentru LogIn */}
          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;
