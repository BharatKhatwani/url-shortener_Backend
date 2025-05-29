const express  = require('express');

const router = express.Router();
const { signup, login, refreshTokenHandler } = require('../Controller/UserController.js');

router.post('/signup', signup );
router.post('/login', login );
router.post('/refreshtoken', refreshTokenHandler);

module.exports = router;