const express = require("express");
const router = express.Router();
const forumController = require("../controllers/Forum");
const privateSchoolControllers = require('../controllers/privateSchool')
const studentControllers = require('../controllers/student')
const commentController = require("../controllers/comment");
const postController = require("../controllers/post");

const privateSchoolAuth = require("../middelware/PrivateSchoolAuth");
const studentAuth = require("../middelware/StudentAuth");
const teacherAuth = require("../middelware/TeacherAuth");

router.post("/create", privateSchoolAuth, forumController.createForum);
router.get('/all'  , privateSchoolControllers.getAllForums);
router.get('/student/allowed'  , studentAuth  , studentControllers.getAllowedForums);
router.get('/student/registred'  , studentAuth  , forumController.getStudentRegisterForums);
router.get('/posts/:forumId', postController.getAllPost);
router.get('/comments/:postId',commentController.getAllComment);
router.delete("/:forumId", privateSchoolAuth, forumController.deleteForum);
router.get("/:forumId", forumController.getForum);


module.exports = router;
