const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam');

router.post('/create',examController.createExam)
router.post('/question/create/:examId' , examController.createQuestion);
router.get('/:ExamId',examController.getExam)

module.exports = router;