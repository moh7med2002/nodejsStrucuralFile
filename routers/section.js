const express = require('express');
const router = express.Router();

const sectionControllers = require('../controllers/section');

router.post('/create' , sectionControllers.createSection);


module.exports = router;