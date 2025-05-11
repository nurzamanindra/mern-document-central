const asyncHandler = require("../middleware/async");
const User = require("../models/user.model");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc      Update User details
// @route     PUT /api/v1/user/update/:userId
// @access    Private
exports.updateUserDetails = asyncHandler(async (req, res, next) => {

    //check if req.user.id != req.params.userId
    if (req.user.id !== req.params.userId) {
        return next(new ErrorResponse("You are not authorized to update this user", 401));
    }

    const { username, email, password, profilePicture } = req.body;
    const fiedToUpdate = {};

    if (username) fiedToUpdate.username = username.toLowerCase();
    if (email) fiedToUpdate.email = email.toLowerCase();
    if (password) fiedToUpdate.password = password;
    if (profilePicture) fiedToUpdate.profilePicture = profilePicture;

    const user = await User.findByIdAndUpdate(req.params.userId, fiedToUpdate, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: user,
    });
})

// @desc      Delete User details
// @route     DELETE /api/v1/user/delete/:userId
// @access    Private
exports.deleteUser = asyncHandler(async (req, res, next) => {

    //check if req.user.id != req.params.userId
    if (req.user.id !== req.params.userId) {
        return next(new ErrorResponse("You are not authorized to delete this user", 401));
    }

    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
        return next(new ErrorResponse("User not found", 404));
    }

    res.status(200)
    .clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    })
    .json({
        success: true,
        data: {},
    });
})