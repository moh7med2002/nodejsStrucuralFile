const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam');

const studentAuth = require('../middelware/StudentAuth');

const adminAuth = require('../middelware/AdminAuth');


router.post('/create' , adminAuth , examController.createExam)
router.post('/question/create/:examId' , adminAuth ,examController.createQuestion);
router.post('/mark/:examId' , studentAuth ,examController.markExam);
router.get('/student/:ExamId' , studentAuth ,examController.getExamForStudent);
router.get('/:ExamId',examController.getExam);
router.put('/:examId' , adminAuth ,examController.updateExam);

module.exports = router;