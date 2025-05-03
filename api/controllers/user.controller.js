const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Register user
// @route     POST /api/v1/auth/signup
// @access    Public
exports.signup = asyncHandler( async(req, res, next) => {

  const {username, email, password} = req.body;

  //create user
  const user = await User.create({
    username, 
    email, 
    password
  });

  sendTokenResponse(user, 200, res);
}
);


// @desc      Register user
// @route     POST /api/v1/auth/signin
// @access    Public
exports.signin = asyncHandler(async (req, res, next) =>{
  const {email, password} = req.body;
  console.log(req.cookies.access_token)
  //validate email and password
  if(!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  //check if user exist
  const user = await User.findOne({email}).select("+password");

  if(!user){
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  //check if password match
  const isMatch = await user.matchPassword(password)
  if(!isMatch){
    return next(new ErrorResponse("Invalid Credentials", 401))
  }

  sendTokenResponse(user, 200, res);

 }
)


//send jwt token auth to cookie response
const sendTokenResponse = (user, statusCode, res) => {

  const token  = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if(process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode)
    .cookie('access_token', token, options)
    .json({
      success: true
    })

}