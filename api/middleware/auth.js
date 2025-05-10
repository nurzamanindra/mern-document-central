const asyncHandler = require("./async");
const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.cookies.access_token) {
        token = req.cookies.access_token;
    }

    if(!token) {
        return next(new ErrorResponse("Not authorize to access this route", 401));
    }

    try {
         // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        return next(new ErrorResponse("Not authorize to access this route", 401));
    }
   

}
)