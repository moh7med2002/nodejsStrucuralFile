const express = require('express');
const router = express.Router();

const sectionControllers = require('../controllers/section');

router.post('/create' , sectionControllers.createSection);
router.get('/all' , sectionControllers.getSections);


module.exports = router;