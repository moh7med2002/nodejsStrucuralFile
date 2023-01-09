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


router.get('/:studentId' , studentAuth , studentController.getUser);

router.post('/post' , studentAuth , postController.addPost );
router.delete('/post',studentAuth, postController.deletePost);

router.post('/post' , studentAuth , commentController.addComment );
router.delete('/post',studentAuth, commentController.deleteComment);
router.get('/posts',studentAuth, postController.getAllPost);
router.get('/comments',studentAuth, commentController.getAllComment);


module.exports = router;