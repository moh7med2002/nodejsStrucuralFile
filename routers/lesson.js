const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson');

router.post('/create',lessonController.createLesson);
router.put('/:lessonId' , lessonController.updateLesson);

module.exports = router;