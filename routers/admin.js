const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/admin');

const adminAuth = require('../middelware/AdminAuth');

router.post('/register' , adminControllers.registerAdmin);
router.post('/login' , adminControllers.loginAdmin);

router.get('/students/all' , adminAuth , adminControllers.getAllStudents);

router.get('/students/:studentId' , adminAuth , adminControllers.getStudent);

module.exports = router;