const express = require("express");
const router = express.Router();
const forumController = require("../controllers/Forum");
const adminControllers = require('../controllers/admin')

const adminAuth = require("../middelware/AdminAuth");
const studentAuth = require("../middelware/StudentAuth");
const teacherAuth = require("../middelware/TeacherAuth");

router.post("/create", adminAuth, forumController.createForum);
router.get('/all'  , adminControllers.getAllForums);
router.delete("/:forumId", adminAuth, forumController.deleteForum);
router.get("/:forumId", forumController.getForum);

module.exports = router;
