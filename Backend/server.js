// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'goqiitechnologies' // Database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');

  // Create the database if it doesn't exist
  connection.query(`CREATE DATABASE IF NOT EXISTS goqiitechnologies`, (err, result) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database "goqiitechnologies" created or already exists');

    // Switch to the created database
    connection.changeUser({ database: 'goqiitechnologies' }, (err) => {
      if (err) {
        console.error('Error changing database:', err);
        return;
      }
      console.log('Switched to database "goqiitechnologies"');

      // Create users table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          dob DATE NOT NULL
        )
      `;
      connection.query(createTableQuery, (err, result) => {
        if (err) {
          console.error('Error creating table:', err);
          return;
        }
        console.log('Table "users" created or already exists');
      });
    });
  });
});

// Middleware
app.use(bodyParser.json());

// Routes

// Get all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error });
      return;
    }
    res.json(results);
  });
});

// Get single user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  connection.query('SELECT * FROM users WHERE id = ?', userId, (error, results, fields) => {
    if (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Create a new user
app.post('/users', (req, res) => {
  const { name, email, password, dob } = req.body;
  const insertQuery = 'INSERT INTO users (name, email, password, dob) VALUES (?, ?, ?, ?)';
  connection.query(insertQuery, [name, email, password, dob], (error, results, fields) => {
    if (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ error });
      return;
    }
    res.status(201).json({ message: 'User created successfully', id: results.insertId });
  });
});

// Update user by ID
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, password, dob } = req.body;
  const updateQuery = 'UPDATE users SET name = ?, email = ?, password = ?, dob = ? WHERE id = ?';
  connection.query(updateQuery, [name, email, password, dob, userId], (error, results, fields) => {
    if (error) {
      console.error('Error updating user:', error);
      res.status(400).json({ error });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User updated successfully' });
  });
});

// Delete user by ID
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const deleteQuery = 'DELETE FROM users WHERE id = ?';
  connection.query(deleteQuery, [userId], (error, results, fields) => {
    if (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
