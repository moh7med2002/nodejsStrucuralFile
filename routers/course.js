const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

router.post('/create',courseController.createCourse)
router.get('/fulldata/:courseId' , courseController.getFullCourse);
router.get('/:courseId',courseController.getSingleCourse);
router.delete('/:courseId' , courseController.deleteCourse);

module.exports = router;