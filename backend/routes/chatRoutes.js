const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { sendMessage, getMessages,deleteMessage } = require('../controllers/chatController');

router.post('/send', auth, sendMessage);
router.get('/:receiverId', auth, getMessages);
router.delete('/:id', auth, deleteMessage);

module.exports = router;
