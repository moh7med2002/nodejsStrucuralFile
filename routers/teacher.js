const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');

router.post('/register', teacherController.registerTeacher);
router.post('/login',teacherController.loginTeacher);
router.get('/all',teacherController.getTeachers)

module.exports = router;