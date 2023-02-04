const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parent');


const parentAuth = require('../middelware/ParentAuth');

router.post('/register' , parentController.register);
router.post('/login' , parentController.login);
router.get('/students/all' , parentController.getAllStudent);
router.get('/students/child' , parentAuth , parentController.getHisChild);
router.post('/students/add' , parentAuth  , parentController.requestStudentToAdd);
router.get('/student/:studentId' , parentAuth , parentController.getGrades);
router.get('/notifications' , parentAuth , parentController.getNotification);
router.put('/notifications' , parentAuth , parentController.updateNoificationsStatus);

module.exports = router;