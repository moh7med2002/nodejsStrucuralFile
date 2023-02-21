const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson');

const privateSchoolAuth = require('../middelware/PrivateSchoolAuth');
const studentAuth = require('../middelware/StudentAuth');
const teacherAuth = require('../middelware/TeacherAuth')

router.post('/create', privateSchoolAuth ,lessonController.createLesson);
router.post('/teacher/create', teacherAuth ,lessonController.createLesson);

router.put('/teacher/:lessonId' , teacherAuth ,lessonController.updateLesson);

router.put('/accept/:lessonId' , privateSchoolAuth , lessonController.acceptLessonByPrivateSchool);
router.put('/:lessonId' , privateSchoolAuth ,lessonController.updateLesson);


router.delete('/teacher/:lessonId' , teacherAuth , lessonController.deleteLesson);
router.delete('/:lessonId' , privateSchoolAuth , lessonController.deleteLesson);


router.get('/unit/:unitId' , lessonController.getUnitLesson);
router.get('/lessons/:lessonId' , studentAuth , lessonController.getSingleLesson);

module.exports = router;