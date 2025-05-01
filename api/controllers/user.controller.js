const User = require('../models/user.model');

exports.test = (req, res, next) => {
    res
    .status(200)
    .json({
        message: "from test user API"
    })
}

exports.testCreate = async (req, res, next) => {
    await User.create(req.body)
    res
    .status(200)
    .json({
        message: "from test user API - success create"
    })
}