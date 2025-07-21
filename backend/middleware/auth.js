const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(" ")[1]; // autharization header incoming req usinf optional channing avaoid error in header
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });  // no token send 401 unthorization 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // veryfy the token  and secert keya 
    req.user = decoded; // contains user id
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' }); //  401 unautharized 
  }
};

module.exports = auth;
