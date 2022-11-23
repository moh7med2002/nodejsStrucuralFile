const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const studentAuth = require('../middelware/StudentAuth');
router.post('/register', studentController.registerStudent);
router.post('/login',studentController.loginStudent);

router.get('/allowedCourses' , studentAuth , studentController.getAllowedCourses);

module.exports = router;