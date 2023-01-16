const express=require('express');
const barserBody=require('body-parser');
const multer=require('multer');
const path=require('path');
const app=express();
const cors = require('cors');





const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'images');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+"-" + file.originalname)
    }
})


app.use(cors());

app.use(barserBody.json());

// save image
app.use(multer({storage:fileStorage}).single('image'));
app.use('/images', express.static(path.join(__dirname,'images')));




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
const Section = require('./models/Section');
const Wallet = require('./models/Wallet')
const Group = require('./models/Group');
const GroupLesson = require('./models/GroupLesson');
const Psycho = require('./models/Psycho');
const PsychoStudent = require('./models/PsychoStudent');


//  parent
Parent.hasMany(Student,{onDelete:"SET NULL"});

// Student
Student.belongsTo(Parent);
Student.belongsTo(Level);
Student.belongsTo(Class);
Student.belongsTo(Section);
Student.belongsToMany(Course, { through: "Student_Course"});
Student.belongsToMany(Group, { through: "Student_Group"});
Student.belongsToMany(Forum, { through: "Student_Forum", onDelete:"CASCADE"});
Student.belongsToMany(Psycho, { through: PsychoStudent, onDelete:"CASCADE"});
Student.hasMany(Grade , {onDelete:"CASCADE" });
Student.hasMany(Wallet , {onDelete:"CASCADE" });
Student.hasMany(Post)

//  Teacher
Teacher.hasMany(Course , {onDelete:"SET NULL"});
Teacher.hasMany(Group , {onDelete:"SET NULL"});
Teacher.hasMany(Forum , {onDelete:"SET NULL"});
Teacher.hasMany(Psycho , {onDelete:"SET NULL"});
Teacher.hasMany(Post)
// Course
Course.belongsTo(Teacher);
Course.belongsToMany(Student, { through: "Student_Course"});
Course.belongsTo(Subject);
Course.belongsTo(Level);
Course.belongsTo(Class);
Course.belongsTo(Section);
Course.hasMany(Unit ,{onDelete:"CASCADE"});

// Psycho
Psycho.belongsTo(Teacher);
Psycho.belongsToMany(Student, { through: PsychoStudent, onDelete:"CASCADE"});


// PsychoStudent
PsychoStudent.belongsTo(Student);
PsychoStudent.belongsTo(Psycho);

// Group
Group.belongsTo(Teacher);
Group.belongsToMany(Student, { through: "Student_Group"});
Group.belongsTo(Subject);
Group.belongsTo(Level);
Group.belongsTo(Class);
Group.belongsTo(Section);
Group.hasMany(GroupLesson , {onDelete:"CASCADE"});


//  Group Lesson
GroupLesson.belongsTo(Group);


// Unit
Unit.hasMany(Lesson , {onDelete:"CASCADE"});
Unit.belongsTo(Course);
Unit.hasMany(Exam , {onDelete:"CASCADE"});

// Lesson
Lesson.belongsTo(Unit);

// Exam 
Exam.belongsTo(Unit);
Exam.hasMany(Question, {onDelete:"CASCADE"});
Exam.hasMany(Grade , {onDelete:"CASCADE" });


// Question
Question.belongsTo(Exam)
Question.hasMany(Answer , {onDelete:"CASCADE"})

// Answer
Answer.belongsTo(Question)

// Forum 
Forum.belongsToMany(Student, { through: "Student_Forum", onDelete:"CASCADE" });
Forum.belongsTo(Teacher)
Forum.hasMany(Post , {onDelete:"CASCADE"})

// Post
Post.belongsTo(Forum)
Post.hasMany(Comment , {onDelete:"CASCADE"})
Post.belongsTo(Teacher)
Post.belongsTo(Student)

// Comment
Comment.belongsTo(Post)

// Level
Level.hasMany(Class)
Level.hasMany(Subject);

//class
Class.belongsTo(Level)
Class.hasMany(Subject)
Class.hasMany(Section);

//subject
Subject.belongsTo(Class)
Subject.belongsTo(Level)
Subject.belongsTo(Section);


//  Section
Section.belongsTo(Class);


// grade
Grade.belongsTo(Exam);
Grade.belongsTo(Student); 

// Wallet
Wallet.belongsTo(Student);


// refer routes
const studentRouter = require('./routers/student');
app.use('/api/student' , studentRouter);

const teacherRouter = require('./routers/teacher');
app.use('/api/teacher' , teacherRouter);

const levelRouter = require('./routers/level');
app.use('/api/level' , levelRouter);

const classRouter = require('./routers/class');
app.use('/api/class' , classRouter);

const subjectsRouter = require('./routers/subject');
app.use('/api/subject' , subjectsRouter);

const courseRouter = require('./routers/course');
app.use('/api/course' , courseRouter);

const unitRouter = require('./routers/unit');
app.use('/api/unit' , unitRouter);


const lessonRouter = require('./routers/lesson');
app.use('/api/lesson' , lessonRouter);

const examRouter = require('./routers/exam');
app.use('/api/exam' , examRouter);


const sectionRouter = require('./routers/section');
app.use('/api/section' , sectionRouter);

const adminRouter = require('./routers/admin');
app.use('/api/admin' , adminRouter);

const walletRouter = require('./routers/wallet');
app.use('/api/wallet' , walletRouter);


const groupRouter = require('./routers/group');
app.use('/api/group' , groupRouter);

const forumRouter = require('./routers/Forum');
app.use('/api/forum' , forumRouter);

const psychoRouter = require('./routers/psycho');
app.use('/api/psycho' , psychoRouter);


app.use((error,req,res,next)=>{
    console.log(error);
    const status=error.statusCode||500;
    const message=error.message;
    const data=error.data;
    res.status(status).json({message:message, data:data , error:error});
});

const port = process.env.PORT || 9000;
console.log(port);
const seqalize = require('./util/database');
seqalize
.sync({alter:true})
.then(result=>{
    console.log('conntect');
    app.listen(port);
})
.catch(err=>{
    console.log(err);
})