const express = require('express');

const {signup, signin, google, getMe, signout } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin)
router.post('/signout',protect,signout)
router.post('/google', google);
router.get('/me',protect, getMe)


module.exports = router;

