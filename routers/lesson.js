const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson');

const adminAuth = require('../middelware/AdminAuth');
const studentAuth = require('../middelware/StudentAuth');
const teacherAuth = require('../middelware/TeacherAuth')

router.post('/create', adminAuth ,lessonController.createLessonByAdmin);
router.post('/teacher/create', teacherAuth ,lessonController.createLessonByAdmin);

router.put('/:lessonId' , adminAuth ,lessonController.updateLessonByAdmin);

router.delete('/:lessonId' , adminAuth , lessonController.deleteLesson);
router.get('/unit/:unitId' , lessonController.getUnitLesson);
router.get('/lessons/:lessonId' , studentAuth , lessonController.getSingleLesson);

module.exports = router;