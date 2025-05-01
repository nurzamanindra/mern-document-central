const express = require('express');

const {test, testCreate } = require('../controllers/user.controller');

const router = express.Router();

router.route('/get-test')
.get(test)
.post(testCreate);

module.exports = router;

