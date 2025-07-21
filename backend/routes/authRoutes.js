const  express = require('express');
const { registerUser, loginUser } = require('../controllers/authController.js');
const { getMe , getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', auth, getMe);
router.get('/users', auth, getAllUsers);

module.exports = router;