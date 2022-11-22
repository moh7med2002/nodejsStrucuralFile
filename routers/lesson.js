const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson');

router.post('/create',lessonController.createLesson);
router.put('/:lessonId' , lessonController.updateLesson);
router.delete('/:lessonId' , lessonController.deleteLesson);

module.exports = router;