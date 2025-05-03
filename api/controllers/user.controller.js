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

  //create jwt token
  const token = user.getSignedJwtToken();

  res
  .status(200)
  .json({
    success: true,
    token
  })
}
);


// @desc      Register user
// @route     POST /api/v1/auth/signin
// @access    Public
exports.signin = asyncHandler(async (req, res, next) =>{
  const {email, password} = req.body;

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

   //create token
   const token = user.getSignedJwtToken();

   res
    .status(200)
      .json({
        success: true,
        token
      })

}


)