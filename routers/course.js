const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

router.post('/create',courseController.createCourse)
router.get('/all' , courseController.getAllCourses);
router.get('/fulldata/:courseId' , courseController.getFullCourse);
router.get('/:courseId',courseController.getSingleCourse);
router.delete('/:courseId' , courseController.deleteCourse);
router.put('/:courseId' , courseController.updateCourse);

module.exports = router;