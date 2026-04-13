const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

// POST /messages — send a message
router.post('/', async (req, res) => {
  try {
    const { name, email, content } = req.body;
    const userAgent = req.headers['user-agent'];

    const message = new Message({ name, email, content, userAgent });
    await message.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /messages — get all messages (protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;