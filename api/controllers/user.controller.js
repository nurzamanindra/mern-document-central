const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Get all bootcamps
// @route     GET /api/v1/get-test
// @access    Public
exports.test = asyncHandler(async (req, res, next) => {
  const user = await User.find();

  if (user.length == 0) {
    console.log(`user not found`)
    return next(
      new ErrorResponse(`User not found`, 404)
    );
  }

  res
    .status(200)
    .json({ success: true, count: user.length, data: user });
});


// @desc      Get all bootcamps
// @route     POST /api/v1/get-test
// @access    Public
exports.testCreate = asyncHandler(async (req, res, next) => {
    await User.create(req.body)
    res
    .status(200)
    .json({
        message: "from test user API - success create"
    })
});