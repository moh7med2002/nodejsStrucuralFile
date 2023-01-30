const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parent');

router.post('/register' , parentController.register);
router.post('/login' , parentController.login);
router.get('/students/all' , parentController.getAllStudent);

module.exports = router;