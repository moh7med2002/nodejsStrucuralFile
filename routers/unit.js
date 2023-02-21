const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unit');

const privateSchoolAuth = require('../middelware/privateSchoolAuth');
const teacherAuth = require('../middelware/TeacherAuth');

router.post('/create', privateSchoolAuth ,unitController.createUnitByPrivateSchool);
router.post('/teacher/create', teacherAuth ,unitController.createUnitByTeacher);



router.put('/teacher/:unitId' , teacherAuth , unitController.updateUnitByTeacher);
router.put('/:unitId' , privateSchoolAuth , unitController.updateUnitByPrivateSchool);



router.get('/exams/:unitId' , unitController.getUnitExams);

router.get('/course/:courseId' , unitController.getCourseUnit);

router.get('/all' , unitController.getUnits);


router.delete('/teacher/:unitId' , teacherAuth ,unitController.deleteUnitByteacher);
router.delete('/:unitId' , privateSchoolAuth ,unitController.deleteUnitByPrivateSchool);


module.exports = router;