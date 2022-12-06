const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unit');

const adminAuth = require('../middelware/AdminAuth');

router.post('/create', adminAuth ,unitController.createUnit);
router.put('/:unitId' , adminAuth , unitController.updateUnit);
router.get('/exams/:unitId' , unitController.getUnitExams);
router.get('/course/:courseId' , unitController.getCourseUnit);
router.get('/all' , unitController.getUnits);
router.delete('/:unitId' , adminAuth ,unitController.deleteUnit);


module.exports = router;