require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});