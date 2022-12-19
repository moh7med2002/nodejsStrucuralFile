const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam');

const studentAuth = require('../middelware/StudentAuth');

const adminAuth = require('../middelware/AdminAuth');

const teacherAuth = require('../middelware/TeacherAuth');


router.post('/teacher/create' , teacherAuth , examController.createExam );
router.post('/create' , adminAuth , examController.createExam);


router.post('/teacher/question/create/:examId' , teacherAuth ,examController.createQuestion);
router.post('/question/create/:examId' , adminAuth ,examController.createQuestion);


router.post('/mark/:examId' , studentAuth ,examController.markExam);


router.get('/student/allowed'  , studentAuth  , examController.getAllowedExamsForStudent);

router.get('/student/:ExamId' , studentAuth ,examController.getExamForStudent);

router.get('/teacher/grades/:examId' , teacherAuth , examController.getExamGradeForTeacher);

router.get('/:ExamId',examController.getExam);


router.put('/question/update' ,  adminAuth ,examController.updateQuestion)

router.put('/teacher/:examId' , teacherAuth ,examController.updateExam);
router.put('/:examId' , adminAuth ,examController.updateExam);

module.exports = router;