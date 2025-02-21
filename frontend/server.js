// Importing necessary libraries
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

// Initialize the Express app
const app = express();
const port = 3000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// In-memory user storage (simulating a database)
let user = {
  is_success: true,
  user_id: "Sushant_Singal", // name and dob
  email: "223738.cse.cec@cgc.edu.in", // email address
  roll_number: "2237038", // roll number
};

let alphabets = [];
let numbers = [];
let highest_alphabets = [];

// API to add a user
app.post("/add-user", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: "Data is required" });
  }

  numbers = data.filter(item => !isNaN(item));
  alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
  highest_alphabets = alphabets.length > 0
    ? [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? -1 : 1)[0]]
    : [];

  user = { ...user, numbers, alphabets, highest_alphabets };

  res.status(201).json({ message: "User added successfully", user });
});

// API to get all users
app.get("/users", (req, res) => {
  res.json(user);
});

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Serve React app for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
