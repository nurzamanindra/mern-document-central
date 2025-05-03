const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: [true, 'username already exist'],
    minlength: [6, 'username length min 6 character'],
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
    minlength: [6, 'password length min 6 character'],
    select: false
  },
 }, {
  timestamps: {
    currentTime: () => new Date(new Date().getTime() + (7 * 60 * 60 * 1000)), // UTC+7
  }
});

//encrypt password before save
UserSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
});

//sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign(
    {id: this._id},
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRE}

  )
}

UserSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

 module.exports = mongoose.model('User', UserSchema);