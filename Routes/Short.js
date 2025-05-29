const express = require('express');

const router = express.Router();
const {createShortId , sendRequest } = require('../Controller/ShortController');

router.post('/short',createShortId )
router.get('/:shortId', sendRequest );

module.exports = router