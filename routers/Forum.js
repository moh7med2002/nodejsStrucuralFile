const express = require("express");
const router = express.Router();
const forumController = require("../controllers/Forum");

const adminAuth = require("../middelware/AdminAuth");
const studentAuth = require("../middelware/StudentAuth");
const teacherAuth = require("../middelware/TeacherAuth");

router.post("/create", adminAuth, forumController.createForum);
router.delete("/:forumId", adminAuth, forumController.deleteForum);

module.exports = router;
