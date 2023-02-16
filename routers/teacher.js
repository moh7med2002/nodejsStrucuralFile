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
router.get('/posts/:forumId',teacherAuth, postController.getAllPost);
router.get('/comments/:postId',teacherAuth, commentController.getAllComment);
router.post('/post/:forumId' , teacherAuth , postController.addPost );
router.delete('/post',teacherAuth, postController.deletePost);
router.post('/comment/:postId' , teacherAuth , commentController.addComment );
router.delete('/comment/:commentId',teacherAuth, commentController.deleteComment);
router.get('/:teacherId',teacherController.getTeacher)
router.put('/update/image' , teacherAuth ,teacherController.updateTeacherImage);
router.get('/my-forums' , teacherAuth , teacherController.getTeacherForums );

module.exports = router;