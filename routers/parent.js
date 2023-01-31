const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parent');


const parentAuth = require('../middelware/ParentAuth');

router.post('/register' , parentController.register);
router.post('/login' , parentController.login);
router.get('/students/all' , parentController.getAllStudent);
router.post('/students/add' , parentAuth  , parentController.requestStudentToAdd);

module.exports = router;