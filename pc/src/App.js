import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Asigură-te că importul este corect

import LogIn from './components/LogIn';

const App = () => {
  return (
    <Router>
      <Routes> {/* Schimbă acest lucru */}
        <Route path="/" element={<LogIn />} /> {/* Schimbă acest lucru */}
      </Routes> {/* Schimbă acest lucru */}
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
export default LogIn.jsx;