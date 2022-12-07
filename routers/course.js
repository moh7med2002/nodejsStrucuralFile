const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

const adminAuth = require('../middelware/AdminAuth');





router.post('/create', adminAuth , courseController.createCourseByAdmin)
router.get('/all' , courseController.getAllCourses);
router.get('/fulldata/:courseId' , courseController.getFullCourse);
router.get('/:courseId',courseController.getSingleCourse);
router.delete('/:courseId' , adminAuth ,courseController.deleteCourseByAdmin);
router.put('/:courseId' , adminAuth ,courseController.updateCourseByAdmin);

module.exports = router;