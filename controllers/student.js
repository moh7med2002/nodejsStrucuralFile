const Student = require('../models/Student');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Grade = require('../models/Grade');
const Exam = require('../models/Exam');

module.exports.registerStudent = async(req,res,next)=>
{
    try{
        const {name , email , password , gender , LevelId, ClassId , SectionId} = req.body;
        const student = await Student.findOne({where:{email:email}});
        if (student){
            const error = new Error ('الايميل مستخدم');
            error.statusCode = 403;
            throw error;
        }
        const hashPass = await bcrypt.hash(password,12);
        const newStudent = await Student.create({
            email:email,
            password:hashPass,
            name:name,
            LevelId:LevelId,
            ClassId:ClassId,
            gender:gender,
            money:0,
            SectionId:SectionId||null
        });
        await newStudent.save()
        res.status(200).json({message:'تم انشاء حساب الطالب'});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


exports.loginStudent = async(req,res,next)=>{
    const {email,password : pass} = req.body;
    try{
        const currentStudent = await Student.findOne({where:{email:email}});
        if(!currentStudent){
            const error = new Error('الايميل غير موجود');
            error.statusCode = 422;
            throw error;
        }
        const isPasswordMatch = await bcrypt.compare(pass,currentStudent.password);
        if(!isPasswordMatch){
            const error = new Error('كلمة السر غير صحيحة');
            error.statusCode=422;
            throw error;
        };
        const {password,...other} = {...currentStudent.toJSON()}
        const token = jwt.sign({
            studentId:currentStudent.id,
        },
        "token"
        );
        res.status(200).json({student:other, token:token});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}



// get courses which student can register
module.exports.getAllowedCourses = async(req,res,next)=>{
    const studentId = req.studentId;
    try{
        const currentStudent = await Student.findOne({where:{id:studentId}});
        if(!currentStudent){
            const error = new Error('يرجى تسجيل الدخول');
            error.statusCode = 422;
            throw error;
        }
        const courses = await Course.findAll(
            {where:{LevelId:currentStudent.LevelId, ClassId:currentStudent.ClassId , SectionId : currentStudent.SectionId},include:{all:true}}
        );
        res.status(200).json({courses:courses});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}



//  get student grades
module.exports.getGrades = async (req,res,next) => {
    const studentId = req.studentId;
    try{
        const grades = await Grade.findAll({where:{StudentId : studentId} ,
        include : {model: Exam}
        })
        res.status(200).json({grades});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


// get student own money
module.exports.getMoney = async (req,res,next) =>{
    const studentId = req.studentId;
    try{
        const studnet = await Student.findOne({where:{id : studentId}})
        res.status(200).json({money : studnet.money});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.registerCourse = async (req,res,next) =>{
    const studentId = req.studentId;
    const {courseId} = req.params;
    try{
        const course = await Course.findOne({where: {id : courseId}});
        const student = await Student.findOne({where : {id : studentId}});
        if(course.price > student.money){
            const error = new Error('المبلغ غير كافي');
            error.statusCode = 422;
            throw error;
        }
        await course.addStudent(student);
        student.money -= course.price;
        await student.save(); 
        res.status(201).json({message:"تم الإشتراك في الكورس بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}



module.exports.getRegistredCourses = async (req,res,next) => {
    const studentId = req.studentId;
    try{
        const student = await Student.findOne({where : {id : studentId}});
        const courses = await student.getCourses();
        res.status(200).json({courses});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}