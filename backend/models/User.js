const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String,unique: true , required: true
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

let User = mongoose.model('User', userSchema);
module.exports = User;
