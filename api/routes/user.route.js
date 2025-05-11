const express = require('express');
const {updateUserDetails, deleteUser} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth');


const router = express.Router();

router.put('/update/:userId', protect, updateUserDetails);
router.delete('/delete/:userId', protect, deleteUser);


module.exports = router;