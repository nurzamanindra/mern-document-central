const mongoose = require('mongoose');
 
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: [true, 'username already exist']
  },

  email: {
   type: String,
   required: [true, 'Please add an email'],
   unique: [true, 'email already registered!'],
   match: [
     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
 });

 module.exports = mongoose.model('User', UserSchema);