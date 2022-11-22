const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unit');

router.post('/create',unitController.createUnit);
router.put('/:unitId' , unitController.updateUnit);
router.get('/course/:courseId' , unitController.getCourseUnit);
router.get('/all' , unitController.getUnits);
router.delete('/:unitId' , unitController.deleteUnit);


module.exports = router;