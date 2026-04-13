require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');


const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use('/messages', messageRoutes);


connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});