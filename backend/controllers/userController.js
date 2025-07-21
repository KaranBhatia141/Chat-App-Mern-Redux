const User = require('../models/User');

// GET /api/auth/me
const getMe = async (req, res) => {     //controller user 
  try {
    const user = await User.findById(req.user.id).select('-password');   // check user in db 
    if (!user) return res.status(404).json({ msg: 'User not found' });   // if user not found send response 
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });  // internal server error error
  }
};

const getAllUsers = async (req, res) => {   // Get all user which save in db 
  try {
    const users = await User.find().select('-password');  // users which in db 
    res.status(200).json(users); //send res srever ok 
  } catch (err) {  // error
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch users' });   // internal server error 
  }
};

module.exports = { getMe , getAllUsers };
