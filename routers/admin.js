const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/admin');

const adminAuth = require('../middelware/AdminAuth');

router.post('/register' , adminControllers.registerAdmin);
router.post('/login' , adminControllers.loginAdmin);

router.post('/registerPrivateSchool' , adminControllers.registerPrivateSchool);

router.get('/students/all' , adminAuth , adminControllers.getAllStudents);
router.get('/forums/all' , adminAuth , adminControllers.getAllForums);

router.get('/students/:studentId' , adminAuth , adminControllers.getStudent);
router.get('/forums/:forumId' , adminAuth , adminControllers.getForum);
router.put('/student/password' , adminAuth , adminControllers.updateStudentPassword);

router.put('/student/info' , adminAuth , adminControllers.updateStudentInfo);
router.put('/forum/info' , adminAuth , adminControllers.updateForumInfo);

router.get('/parent/request' , adminAuth , adminControllers.getAllParentWaiting);
router.get('/parent/request/history' , adminAuth , adminControllers.getAllParentWaitingHistory);
router.put('/parent/request/accept/:id' , adminAuth , adminControllers.acceptParentRequest);
router.put('/parent/request/reject/:id' , adminAuth , adminControllers.rejectParentRequest);



module.exports = router;