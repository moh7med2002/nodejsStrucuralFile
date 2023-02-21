const Course = require('../models/Course');
const Subject = require('../models/Subject');
const Unit = require('../models/Unit');
const Lesson = require('../models/Lesson');
const Exam = require('../models/Exam');
const Question = require('../models/Question')
const fs = require('fs');
const path = require('path');
const Student = require('../models/Student');

exports.createCourseByPrivateSchool = async(req,res,next)=>
{
    try{
        const {title,price,TeacherId,SubjectId, goals} = req.body;
        if(!req.file)
        {
            const error = new Error('الصورة غير موجودة')
            error.statusCode = 403
            throw new error
        }
        const subject = await Subject.findOne({where:{id:SubjectId}});
        if(!subject)
        {
            const error = new Error('المادة غير موجودة')
            error.statusCode = 403
            throw new error
        }
        const imageName = req.file.filename;
        const course = new Course({...req.body , image : imageName , LevelId:subject.LevelId , ClassId:subject.ClassId, SectionId:subject.SectionId , price:+price});
        await course.save()
        res.status(201).json('تم انشاء الدورة')
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.getAllCourses = async (req,res,next)=>{
    try{
        const courses = await Course.findAll({include:{all:true}});
        res.status(200).json({courses:courses});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


// get all data of course 
module.exports.getFullCourse = async (req,res,next)=>{
    const {courseId} = req.params;
    try{
        const course = await Course.findOne({
            where:{id:courseId},
            include:[
                {
                    model  : Student
                },
                {
                    model: Unit,
                    include:[
                        {
                            model : Exam ,
                            include :{
                                model : Question
                            }
                        },
                        {
                            model : Lesson
                        }
                    ]
                }
            ]
        });
        res.status(200).json({course});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
} 

exports.getSingleCourse =async(req,res,next)=>
{
    const {courseId} = req.params;
    try{
        const course = await Course.findOne({where:{id:courseId}}); 
        res.status(200).json({course})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.deleteCourseByPrivateSchool =async(req,res,next)=>
{
    const {courseId} = req.params;
    try{
        const course = await Course.findOne({where:{id:courseId}});
        if(course.image){
            clearImage(course.image);
        }
        await course.destroy(); 
        res.status(200).json({message:"تم حذف الكورس"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.updateCourseByPrivateSchool = async(req,res,next)=>
{
    const {courseId} = req.params;
    const {title, price, TeacherId , goals} =  req.body;
    try{
        const course = await Course.findOne({where:{id:courseId}})
        if(!course)
        {
            const error = new Error('الكورس غير موجود')
            error.statusCode = 404
            throw error
        }
        course.title = title;
        course.price = +price;
        course.goals = goals;
        course.TeacherId = TeacherId;
        await course.save();
        res.status(201).json({message:"تم تعديل الكورس بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}



const clearImage=(filePath)=>{
    filePath=path.join(__dirname,'..',`images/${filePath}`);
    fs.unlink(filePath,(err)=>{
        console.log(err);
    })
}