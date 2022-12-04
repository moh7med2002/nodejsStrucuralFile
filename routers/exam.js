const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam');

const studentAuth = require('../middelware/StudentAuth');

router.post('/create',examController.createExam)
router.post('/question/create/:examId' , examController.createQuestion);
router.post('/mark/:examId' , studentAuth ,examController.markExam);
router.get('/student/:ExamId' , examController.getExamForStudent);
router.get('/:ExamId',examController.getExam);
router.put('/:examId' , examController.updateExam);

module.exports = router;