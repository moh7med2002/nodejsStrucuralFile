const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unit');

router.post('/create',unitController.createUnit)

module.exports = router;