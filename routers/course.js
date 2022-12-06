const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

const adminAuth = require('../middelware/AdminAuth');


router.post('/create', adminAuth , courseController.createCourse)
router.get('/all' , courseController.getAllCourses);
router.get('/fulldata/:courseId' , courseController.getFullCourse);
router.get('/:courseId',courseController.getSingleCourse);
router.delete('/:courseId' , adminAuth ,courseController.deleteCourse);
router.put('/:courseId' , adminAuth ,courseController.updateCourse);

module.exports = router;