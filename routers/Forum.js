const express = require("express");
const router = express.Router();
const forumController = require("../controllers/Forum");
const commentController = require("../controllers/comment");
const postController = require("../controllers/post");

const adminAuth = require("../middelware/AdminAuth");
const studentAuth = require("../middelware/StudentAuth");
const teacherAuth = require("../middelware/TeacherAuth");

router.post("/create", adminAuth, forumController.createForum);
router.get('/posts/:forumId', postController.getAllPost);
router.get('/comments/:postId',commentController.getAllComment);

module.exports = router;
