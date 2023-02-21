const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam');

const studentAuth = require('../middelware/StudentAuth');

const privateSchoolAuth = require('../middelware/PrivateSchoolAuth');

const teacherAuth = require('../middelware/TeacherAuth');


router.post('/teacher/create' , teacherAuth , examController.createExam );
router.post('/create' , privateSchoolAuth , examController.createExam);


router.post('/teacher/question/create/:examId' , teacherAuth ,examController.createQuestion);
router.post('/question/create/:examId' , privateSchoolAuth ,examController.createQuestion);


router.post('/mark/:examId' , studentAuth ,examController.markExam);


router.get('/student/allowed'  , studentAuth  , examController.getAllowedExamsForStudent);

router.get('/student/:ExamId' , studentAuth ,examController.getExamForStudent);

router.get('/teacher/grades/:examId' , teacherAuth , examController.getExamGradeForTeacher);

router.get('/:ExamId',examController.getExam);


router.put('/teacher/question/update/:questionId' , teacherAuth , examController.updateQuestion);
router.put('/question/update/:questionId' ,  privateSchoolAuth ,examController.updateQuestion)

router.put('/teacher/:examId' , teacherAuth ,examController.updateExam);
router.put('/:examId' , privateSchoolAuth ,examController.updateExam);

module.exports = router;