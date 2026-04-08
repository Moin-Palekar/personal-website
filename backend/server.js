require('dotenv').config();
const express = require('express');
const connectDB = require('./db');

const app = express();
const PORT = 8000;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});