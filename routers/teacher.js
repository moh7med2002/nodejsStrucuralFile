const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');

const teacherAuth = require('../middelware/TeacherAuth');

router.post('/register', teacherController.registerTeacher);
router.post('/login',teacherController.loginTeacher);
router.get('/all',teacherController.getTeachers)
router.get('/my-coures' , teacherAuth , teacherController.getTeacherCourses );

module.exports = router;