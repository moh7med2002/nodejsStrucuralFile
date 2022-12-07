const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson');

const adminAuth = require('../middelware/AdminAuth');
const studentAuth = require('../middelware/StudentAuth');

router.post('/create', adminAuth ,lessonController.createLesson);
router.put('/:lessonId' , adminAuth ,lessonController.updateLesson);
router.delete('/:lessonId' , adminAuth , lessonController.deleteLesson);
router.get('/unit/:unitId' , lessonController.getUnitLesson);
router.get('/lessons/:lessonId' , studentAuth , lessonController.getSingleLesson);

module.exports = router;