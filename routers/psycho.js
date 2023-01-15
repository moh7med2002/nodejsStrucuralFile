const express = require('express');
const router = express.Router();
const psychoController = require('../controllers/psycho');

const adminAuth = require('../middelware/AdminAuth');
const teacherAuth = require('../middelware/TeacherAuth');


router.post('/create' , adminAuth , psychoController.createPsycho);

router.get('/all' , adminAuth , psychoController.getAllPsycho);

router.get('/all/teacher' , teacherAuth ,  psychoController.getAllPsychoForTeacher);

router.get('/:psychoId' , psychoController.getPsychoById)

module.exports = router;