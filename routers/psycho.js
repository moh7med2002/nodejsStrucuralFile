const express = require('express');
const router = express.Router();
const psychoController = require('../controllers/psycho');

const adminAuth = require('../middelware/AdminAuth');
const teacherAuth = require('../middelware/TeacherAuth');


router.post('/create' , adminAuth , psychoController.createPsycho);

router.get('/all' , psychoController.getAllPsycho);

router.get('/all/teacher' , teacherAuth ,  psychoController.getAllPsychoForTeacher);

router.get('/:psychoId' , psychoController.getPsychoById);

router.delete('/:psychoId' , adminAuth ,psychoController.deletePsycho)
router.put('/:psychoId' , adminAuth ,psychoController.updatePsycho)



module.exports = router;