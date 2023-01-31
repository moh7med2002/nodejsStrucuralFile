const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parent');


const parentAuth = require('../middelware/ParentAuth');

router.post('/register' , parentController.register);
router.post('/login' , parentController.login);
router.get('/students/all' , parentController.getAllStudent);
router.get('/students/child' , parentAuth , parentController.getHisChild);
router.post('/students/add' , parentAuth  , parentController.requestStudentToAdd);
router.get('/student/grade/:studentId' , parentAuth , parentController.getGrades);

module.exports = router;