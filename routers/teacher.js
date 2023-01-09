const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');
const postController = require('../controllers/post');
const commentController = require('../controllers/comment');


const teacherAuth = require('../middelware/TeacherAuth');

router.post('/register', teacherController.registerTeacher);
router.post('/login',teacherController.loginTeacher);
router.get('/all',teacherController.getTeachers)
router.get('/my-coures' , teacherAuth , teacherController.getTeacherCourses );
router.get('/my-forums' , teacherAuth , teacherController.getTeacherForum );

router.post('/post' , teacherAuth , postController.addPost );
router.delete('/post',teacherAuth, postController.deletePost);

router.post('/comment' , teacherAuth , commentController.addComment );
router.delete('/comment',teacherAuth, commentController.deleteComment);

router.get('/posts',teacherAuth, postController.getAllPost);
router.get('/comments',teacherAuth, commentController.getAllComment);


module.exports = router;