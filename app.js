const express=require('express');
const barserBody=require('body-parser');
const multer=require('multer');
const path=require('path');
const mongoose=require('mongoose')
const app=express();




const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'images');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+"-" + file.originalname)
    }
})

const pdfStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'attachments');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+"-" + file.originalname)
    }
})

app.use(barserBody.json());
// save image
app.use(multer({storage:fileStorage}).single('image'));
app.use('/images', express.static(path.join(__dirname,'images')));
// save pdf file for teacher cv
app.use(multer({storage:fileStorage}).single('file'));
app.use('/attachments', express.static(path.join(__dirname,'attachments')));



app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,DELETE,POST,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorization');
    if(req.method ==="OPTIONS"){
        return res.sendStatus(200);
    }
    next();
});


const Student = require('./models/Student');
const Admin = require('./models/Admin');
const Parent = require('./models/Parent');
const Course = require('./models/Course');
const Unit = require('./models/Unit');
const Lesson = require('./models/Lesson');
const Exam = require('./models/Exam');
const Question = require('./models/Question');
const Forum = require('./models/Forum');
const Answer = require('./models/Answer');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Level = require('./models/Level');
const Class = require('./models/Class');
const Subject = require('./models/Subject');
const Grade = require('./models/Grade');
const Teacher = require('./models/Teacher');


//  parent
Parent.hasMany(Student,{onDelete:"SET NULL"});

// Student
Student.belongsTo(Parent);
Student.belongsTo(Level);
Student.belongsTo(Class);
Student.belongsToMany(Course, { through: "Student_Course", onDelete:"CASCADE" });
Student.belongsToMany(Forum, { through: "Student_Forum", onDelete:"CASCADE"});
Student.hasMany(Grade , {onDelete:"CASCADE" });

//  Teacher
Teacher.hasMany(Course , {onDelete:"SET NULL"});
Teacher.hasMany(Forum , {onDelete:"SET NULL"});

// Course
Course.belongsTo(Teacher);
Course.belongsToMany(Student, { through: "Student_Course", onDelete:"CASCADE" });
Course.belongsTo(Subject);
Course.belongsTo(Level);
Course.belongsTo(Class);
Course.hasMany(Unit);

// Unit
Unit.hasMany(Lesson);
Unit.belongsTo(Course);
Unit.hasMany(Exam);

// Lesson
Lesson.hasOne(Unit);

// Exam 
Exam.belongsTo(Unit);
Exam.hasMany(Question);

// Question
Question.belongsTo(Exam)
Question.hasMany(Answer)

// Answer
Answer.belongsTo(Question)

// Forum 
Forum.belongsToMany(Student, { through: "Student_Forum", onDelete:"CASCADE" });
Forum.belongsTo(Teacher)
Forum.hasMany(Post)

// Post
Post.belongsTo(Forum)
Post.hasMany(Comment)

// Comment
Comment.belongsTo(Post)

// Level
Level.hasMany(Class)

//class
Class.belongsTo(Level)

// refer routes
const studentRouter = require('./routers/student');
app.use('/api/student' , studentRouter);

const levelRouter = require('./routers/level');
app.use('/api/level' , levelRouter);

const classRouter = require('./routers/class');
app.use('/api/class' , classRouter);

app.use((error,req,res,next)=>{
    console.log(error);
    const status=error.statusCode||500;
    const message=error.message;
    const data=error.data;
    res.status(status).json({message:message, data:data});
});



const seqalize = require('./util/database');
seqalize
.sync({force:true})
.then(result=>{
    console.log('conntect');
    app.listen(process.env.PORT || 8080);
})
.catch(err=>{
    console.log(err);
})