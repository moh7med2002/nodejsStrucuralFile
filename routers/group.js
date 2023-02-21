const express = require('express');
const router = express.Router();

const groupControllers = require('../controllers/group');

const privateSchoolAuth = require('../middelware/PrivateSchoolAuth');
const teacherAuth = require('../middelware/TeacherAuth');
const studentAuth = require('../middelware/StudentAuth')


router.post('/teacher/create' , teacherAuth , groupControllers.createGroup);
router.post('/create' , privateSchoolAuth , groupControllers.createGroup);
router.post('/lesson/create' , privateSchoolAuth , groupControllers.createGroupLesson)
router.post('/teacher/lesson/create' , teacherAuth , groupControllers.createGroupLesson);

router.post('/register/:groupId' , studentAuth  , groupControllers.registerGroup);



router.put('/teacher/update/:groupId' , teacherAuth , groupControllers.updateGroup);
router.put('/update/:groupId' , privateSchoolAuth , groupControllers.updateGroup);
router.put('/lesson/update/:lessonId' , privateSchoolAuth , groupControllers.updateeGroupLesson);
router.put('/teacher/lesson/update/:lessonId' , teacherAuth , groupControllers.updateeGroupLesson);



router.get('/one/:groupId' , groupControllers.getGroupeById)
router.get('/all' , groupControllers.getAllGroupe)
router.get('/lessons/:groupId' , groupControllers.getAllLesson);
router.get('/forStudent' , studentAuth ,groupControllers.getGroupsForStudent);
router.get('/student/registred' , studentAuth ,groupControllers.getStudentRegisterGroups);
router.get('/teacher' , teacherAuth , groupControllers.getGroupsForTeacher);

module.exports = router;