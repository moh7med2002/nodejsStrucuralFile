const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const Level = require('../models/Level')

router.post('/register', studentController.registerStudent);
router.post('/login',studentController.loginStudent);

module.exports = router;