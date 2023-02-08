const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const postController = require('../controllers/post');
const commentController = require('../controllers/comment');
const studentAuth = require('../middelware/StudentAuth');
router.post('/register', studentController.registerStudent);
router.post('/login',studentController.loginStudent);

router.get('/allowedCourses' , studentAuth , studentController.getAllowedCourses);

router.get('/grades' , studentAuth , studentController.getGrades);

router.get('/money' , studentAuth , studentController.getMoney);

router.post('/course/register/:courseId' , studentAuth , studentController.registerCourse);

router.get('/my-coures' , studentAuth ,studentController.getRegistredCourses);

router.put('/update/image' , studentAuth , studentController.updateStudentImage);


router.get('/:studentId' , studentController.getUser);
router.get('/posts/:forumId',studentAuth, postController.getAllPost);
router.get('/comments/:postId',studentAuth, commentController.getAllComment);

router.post('/post/:forumId' , studentAuth , postController.addPost );
router.delete('/post/:postId',studentAuth, postController.deletePost);

router.post('/comment/:postId' , studentAuth , commentController.addComment );
router.post('/joinForum/:forumId' , studentAuth , studentController.joinForum );
router.delete('/comment/:commentId',studentAuth, commentController.deleteComment);



module.exports = router;