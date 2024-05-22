const express = require('express');
const router = express.Router();
const pool = require('./db');
const cors = require('cors');

router.use(cors());
router.use(express.json()); // For parsing JSON requests

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  // Placeholder for actual authentication logic
  const userRole = req.user.role;  // Ensure your auth setup populates `req.user`
  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// Route for user registration
router.post('/signup', (req, res) => {
  const { fname, lname, email, password } = req.body;
  
  pool.query('SELECT * FROM users WHERE Email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    pool.query('INSERT INTO users (Username, Password, Email) VALUES (?, ?, ?)', 
               [`${fname} ${lname}`, password, email], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Internal server error', error });
      }
      
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Route for fetching rooms
router.get('/rooms', (req, res) => {
  pool.query('SELECT * FROM rooms', (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching rooms', error });
    }
    res.json(results);
  });
});

// Admin Route for adding new rooms
router.post('/rooms', isAdmin, (req, res) => {
  const { roomName, capacity, type, location, floor, projector, otherOptions, latitude, longitude } = req.body;

  pool.query('INSERT INTO rooms (RoomName, Capacity, Type, Location, Floor, Projector, OtherOptions, Latitude, Longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
             [roomName, capacity, type, location, floor, projector, otherOptions, latitude, longitude], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }

    res.status(201).json({ message: 'Room added successfully' });
  });
});

// Route for making reservations
router.post('/reservations', (req, res) => {
  const { userId, roomId, startTime, endTime, status, comments } = req.body;

  pool.query('INSERT INTO reservations (UserID, RoomID, StartTime, EndTime, Status, Comments) VALUES (?, ?, ?, ?, ?, ?)', 
             [userId, roomId, startTime, endTime, status, comments], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }

    res.status(201).json({ message: 'Reservation created successfully' });
  });
});

// Route for user login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  pool.query('SELECT * FROM users WHERE Email = ? AND Password = ?', [email, password], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: results[0] });
  });
});

module.exports = router;
