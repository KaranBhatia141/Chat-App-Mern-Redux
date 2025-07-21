const User = require('../models/User.js');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

 const registerUser = async (req, res) => {      // registr controller , async for asyncnosn opeartion 
  const { username, email, password } = req.body;    // require from body or we can say come from frontend 
  try {                                               //try  block 
    const existingUser = await User.findOne({ email });   // checking user existingUser in email already register or not 
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });  // if existing user is there return json response

    const hashedPassword = await bcrypt.hash(password, 10);  // using hash metheod for password security  
    const newUser = await User.create({ username, email, password: hashedPassword });  // save user in db 

    // Send user object only, no token
    res.status(201).json({ user: newUser });   //send resp to client side created 
  } catch (err) {                                // error
    res.status(500).json({ msg: err.message }); //send response to client intern server error
  }
};

// JWT token created only on login
const loginUser = async (req, res) => {  // login controller 
  const { username, password } = req.body;  // aquring user pass and user name from client side 
  try {                                     // checking error 
    const user = await User.findOne({ username });  // user name is xist in db 
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });  // if user not exist send  response 

    const isMatch = await bcrypt.compare(password, user.password); // compare password that useer is legitemate 
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' }); // if pass not match send resp 

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' }); //  jwt sign token for user session

    res.status(200).json({ user, token });  // send res with token request succeeded code 
  } catch (err) {                           // error  
    res.status(500).json({ msg: err.message }); // send resp internal server error
  }
};
module.exports = {registerUser , loginUser};