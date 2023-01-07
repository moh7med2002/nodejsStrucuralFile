const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson');

const adminAuth = require('../middelware/AdminAuth');
const studentAuth = require('../middelware/StudentAuth');
const teacherAuth = require('../middelware/TeacherAuth')

router.post('/create', adminAuth ,lessonController.createLesson);
router.post('/teacher/create', teacherAuth ,lessonController.createLesson);

router.put('/teacher/:lessonId' , teacherAuth ,lessonController.updateLesson);

router.put('/accept/:lessonId' , adminAuth , lessonController.acceptLessonByAdmin);
router.put('/:lessonId' , adminAuth ,lessonController.updateLesson);


router.delete('/teacher/:lessonId' , teacherAuth , lessonController.deleteLesson);
router.delete('/:lessonId' , adminAuth , lessonController.deleteLesson);


router.get('/unit/:unitId' , lessonController.getUnitLesson);
router.get('/lessons/:lessonId' , studentAuth , lessonController.getSingleLesson);

module.exports = router;