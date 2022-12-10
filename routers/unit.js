const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unit');

const adminAuth = require('../middelware/AdminAuth');
const teacherAuth = require('../middelware/TeacherAuth');

router.post('/create', adminAuth ,unitController.createUnitByAdmin);
router.post('/teacher/create', teacherAuth ,unitController.createUnitByTeacher);



router.put('/teacher/:unitId' , teacherAuth , unitController.updateUnitByTeacher);
router.put('/:unitId' , adminAuth , unitController.updateUnitByAdmin);



router.get('/exams/:unitId' , unitController.getUnitExams);

router.get('/course/:courseId' , unitController.getCourseUnit);

router.get('/all' , unitController.getUnits);


router.delete('/teacher/:unitId' , teacherAuth ,unitController.deleteUnitByteacher);
router.delete('/:unitId' , adminAuth ,unitController.deleteUnitByAdmin);


module.exports = router;