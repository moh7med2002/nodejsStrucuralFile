const express = require('express');
const router = express.Router();

const groupControllers = require('../controllers/group');

const adminAuth = require('../middelware/AdminAuth');
const teacherAuth = require('../middelware/TeacherAuth')


router.post('/teacher/create' , teacherAuth , groupControllers.createGroup);
router.post('/create' , adminAuth , groupControllers.createGroup);


router.put('/teacher/update/:groupId' , teacherAuth , groupControllers.updateGroup);
router.put('/update/:groupId' , adminAuth , groupControllers.updateGroup);


router.get('/one/:groupId' , groupControllers.getGroupeById)
router.get('/all' , groupControllers.getAllGroupe)

module.exports = router;