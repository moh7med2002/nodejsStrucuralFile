const Course = require('../models/Course');
const Subject = require('../models/Subject')

exports.createCourse = async(req,res,next)=>
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
        const imageName = req.file.pathname;
        const course = new Course({...req.body , image : imageName , LevelId:subject.LevelId , ClassId:subject.ClassId , price:+price});
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


module.exports.getFullCourse = async (req,res,next)=>{
    const {courseId} = req.params;
    try{
        const course = await Course.findOne({where:{id:courseId}});
        const units = await course.getUnits();
        let savedCourse = [];
        for (const unit of units) {
            const lessons = await unit.getLessons();
            const exams = await unit.getExams();
            savedCourse.push({unit:{...unit.toJSON() , lessons , exams}});
        }
        res.status(200).json({course: { ...course.toJSON() , units:savedCourse}});
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

exports.deleteCourse =async(req,res,next)=>
{
    const {courseId} = req.params;
    try{
        const course = await Course.findOne({where:{id:courseId}});
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

// exports.updateCourse = async(req,res,next)=>
// {
//     const {courseId} = req.params;
//     const {title,price,SubjectId,LevelId,ClassId, goals} =  req.body
//     try{
//         const course = await Course.findOne({where:{id:courseId}})
//         if(!course)
//         {
//             const error = new Error('الكورس غير موجود')
//             error.statusCode = 404
//             throw errror
//         }
//     }
//     catch(err){
//         if(! err.statusCode){
//             err.statusCode=500;
//         }
//         next(err);
//     }
// }