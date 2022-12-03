const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam');

router.post('/create',examController.createExam)
router.post('/question/create/:examId' , examController.createQuestion);
router.post('/mark' , examController.markExam);
router.get('/:ExamId',examController.getExam);
router.put('/:examId' , examController.updateExam);

module.exports = router;