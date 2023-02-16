const express = require("express");
const router = express.Router();
const forumController = require("../controllers/Forum");
const adminControllers = require('../controllers/admin')
const commentController = require("../controllers/comment");
const postController = require("../controllers/post");

const adminAuth = require("../middelware/AdminAuth");
const studentAuth = require("../middelware/StudentAuth");
const teacherAuth = require("../middelware/TeacherAuth");

router.post("/create", adminAuth, forumController.createForum);
router.get('/all'  , adminControllers.getAllForums);
router.get('/posts/:forumId', postController.getAllPost);
router.get('/comments/:postId',commentController.getAllComment);
router.delete("/:forumId", adminAuth, forumController.deleteForum);
router.get("/:forumId", forumController.getForum);


module.exports = router;
