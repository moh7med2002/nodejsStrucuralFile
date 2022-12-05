const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/admin');

router.post('/register' , adminControllers.registerAdmin);
router.post('/login' , adminControllers.loginAdmin);

module.exports = router;