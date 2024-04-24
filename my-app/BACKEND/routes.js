const express = require('express');
const router = express.Router();
const pool = require('./db');
const cors= require('cors');
const app=express();

app.use(cors());

// Route for user registration
router.post('/signup', (req, res) => {
  const { fname, lname, email, password } = req.body; 

  
  pool.query('SELECT * FROM users WHERE Email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    // If the email already exists, send an error response
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

      
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Route for user login
router.post('/login', (req, res) => {
  const { email, password } = req.body; 

  
  pool.query('SELECT * FROM users WHERE Email = ? AND Password = ?', [email, password], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    
    if (results.length === 0) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

   
    res.status(200).json({ message: 'Login successful', user: results[0] });
  });
});

module.exports = router;
