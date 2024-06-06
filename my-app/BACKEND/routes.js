const express = require('express');
const router = express.Router();
const pool = require('./db');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


router.use(cors());
router.use(express.json());

let verificationCodes = {}; // Store verification codes temporarily

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use any email service you prefer
  auth: {
    user: 'agiuroiu36@gmail.com',
    pass: '1Parola2'
  }
});

// Route for user registration
router.post('/signup', (req, res) => {
  const { fname, lname, email, password } = req.body;

  pool.query('SELECT * FROM users WHERE Email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    pool.query('INSERT INTO users (Username, Password, Email) VALUES (?, ?, ?)', [fname + ' ' + lname, password, email], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      // Generate verification code
      const verificationCode = crypto.randomBytes(3).toString('hex');
      verificationCodes[email] = verificationCode;

      // Send verification email
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Your verification code is: ${verificationCode}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ message: 'Error sending verification email' });
          return;
        }

        res.status(201).json({ message: 'User registered successfully. Please check your email for the verification code.' });
      });
    });
  });
});

// Route for verifying email
router.post('/verify-email', (req, res) => {
  const { email, code } = req.body;

  if (verificationCodes[email] === code) {
    pool.query('UPDATE users SET isVerified = 1 WHERE Email = ?', [email], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      delete verificationCodes[email]; // Remove the used code
      res.status(200).json({ message: 'Email verified successfully' });
    });
  } else {
    res.status(400).json({ message: 'Invalid verification code' });
  }
});

// Middleware to check if the user is admin
const isAdmin = (req, res, next) => {
  // const userRole = req.user?.role;
  const userRole = req?.body?.role;
  console.log("FROM isAdmin:", req);
  console.log("check userRole:", req?.body.role);
  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// Route to get user role by userID
router.get('/users/:userId/role', (req, res) => {
  const { userId } = req.params;
  req.pool.query('SELECT Role FROM users WHERE UserID = ?', [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ role: results[0].Role });
  });
});

// Route to add new rooms (admin only)
router.post('/rooms', isAdmin, (req, res) => {
  const { userId, name, capacity, type, latitude, longitude } = req.body;
  if (!userId || !name || !capacity || !type || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  req.pool.query('INSERT INTO rooms (RoomName, Capacity, Type, Latitude, Longitude) VALUES (?, ?, ?, ?, ?)', 
    [name, capacity, type, latitude, longitude], 
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Internal server error', error });
      }
      res.status(201).json({ message: 'Room added successfully' });
  });
});

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

// Route for fetching user data
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;

  pool.query('SELECT * FROM users WHERE UserID = ?', [userId], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(results[0]);
  });
});

// Route for fetching reservations by user ID
router.get('/reservations/:userId', (req, res) => {
  const { userId } = req.params;

  pool.query('SELECT r.*, ro.RoomName FROM reservations r JOIN rooms ro ON r.RoomID = ro.RoomID WHERE r.UserID = ?', [userId], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    res.status(200).json(results);
  });
});
module.exports = router;
