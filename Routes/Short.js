const express = require('express');

const router = express.Router();
const {createShortId , sendRequest } = require('../Controller/ShortController');
const auth = require('../Middlewares/auth')

router.post('/short',auth , createShortId )
router.get('/:shortId',auth ,  sendRequest );

module.exports = router