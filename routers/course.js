const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

const PrivateSchoolAuth = require('../middelware/PrivateSchoolAuth');





router.post('/create', PrivateSchoolAuth , courseController.createCourseByPrivateSchool)
router.get('/all' , courseController.getAllCourses);
router.get('/fulldata/:courseId' , courseController.getFullCourse);
router.get('/:courseId',courseController.getSingleCourse);
router.delete('/:courseId' , PrivateSchoolAuth ,courseController.deleteCourseByPrivateSchool);
router.put('/:courseId' , PrivateSchoolAuth ,courseController.updateCourseByPrivateSchool);

module.exports = router;