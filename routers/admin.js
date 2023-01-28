const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/admin');

const adminAuth = require('../middelware/AdminAuth');

router.post('/register' , adminControllers.registerAdmin);
router.post('/login' , adminControllers.loginAdmin);

router.get('/students/all' , adminAuth , adminControllers.getAllStudents);
router.get('/forums/all' , adminAuth , adminControllers.getAllForums);

router.get('/students/:studentId' , adminAuth , adminControllers.getStudent);

router.put('/student/password' , adminAuth , adminControllers.updateStudentPassword);

router.put('/student/info' , adminAuth , adminControllers.updateStudentInfo);


module.exports = router;