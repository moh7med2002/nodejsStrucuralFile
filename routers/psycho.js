const express = require('express');
const router = express.Router();
const psychoController = require('../controllers/psycho');

const privateSchoolAuth = require('../middelware/PrivateSchoolAuth');
const teacherAuth = require('../middelware/TeacherAuth');
const studentAuth = require('../middelware/StudentAuth');


router.post('/create' , privateSchoolAuth , psychoController.createPsycho);

router.get('/all' , psychoController.getAllPsycho);

router.get('/all/teacher' , teacherAuth ,  psychoController.getAllPsychoForTeacher);

router.get('/all/student' , studentAuth ,  psychoController.getAllPsychoForStudent);

router.get('/accepted/:psychoId' , privateSchoolAuth , psychoController.getAcceptedPsycho);

router.get('/requested/:psychoId' , privateSchoolAuth , psychoController.getrequestededPsycho);

router.get('/teacher/accepted/:psychoId' , teacherAuth , psychoController.getAcceptedPsycho);

router.get('/teacher/requested/:psychoId' , teacherAuth , psychoController.getrequestededPsycho);

router.get('/:psychoId' , psychoController.getPsychoById);

router.delete('/:psychoId' , privateSchoolAuth ,psychoController.deletePsycho);

router.put('/register' , studentAuth , psychoController.registerPsycho);

router.put('/accept' , privateSchoolAuth , psychoController.acceptPsycho);

router.put('/teacher/accept' , teacherAuth , psychoController.acceptPsycho);

router.put('/reject' , privateSchoolAuth , psychoController.rejectPsycho);

router.put('/teacher/reject' , teacherAuth , psychoController.rejectPsycho);

router.put('/:psychoId' , privateSchoolAuth ,psychoController.updatePsycho);



module.exports = router;