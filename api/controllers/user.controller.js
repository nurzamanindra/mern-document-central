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

  //TODO: create jwt token and send back in response;

  res
  .status(200)
  .json({
    success: true,
    data: {
      username : user.username,
      email: user.email
    }
  })

}
);