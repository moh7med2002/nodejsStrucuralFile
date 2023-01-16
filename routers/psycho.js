const express = require('express');
const router = express.Router();
const psychoController = require('../controllers/psycho');

const adminAuth = require('../middelware/AdminAuth');
const teacherAuth = require('../middelware/TeacherAuth');
const studentAuth = require('../middelware/StudentAuth');


router.post('/create' , adminAuth , psychoController.createPsycho);

router.get('/all' , psychoController.getAllPsycho);

router.get('/all/teacher' , teacherAuth ,  psychoController.getAllPsychoForTeacher);

router.get('/accepted' , adminAuth , psychoController.getAcceptedPsycho);

router.get('/requested' , adminAuth , psychoController.getrequestededPsycho);

router.get('/:psychoId' , psychoController.getPsychoById);

router.delete('/:psychoId' , adminAuth ,psychoController.deletePsycho);

router.put('/register' , studentAuth , psychoController.registerPsycho);

router.put('/accept' , adminAuth , psychoController.acceptPsycho);

router.put('/reject' , adminAuth , psychoController.rejectPsycho);


router.put('/:psychoId' , adminAuth ,psychoController.updatePsycho);



module.exports = router;