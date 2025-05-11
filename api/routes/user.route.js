const express = require('express');
const {updateUserDetails} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth');


const router = express.Router();

// @route     PUT /api/v1/user/update/:userId
router.put('/update/:userId', protect, updateUserDetails);


module.exports = router;