const Course = require('../models/Course')

exports.createCourse = async(req,res,next)=>
{
    try{
        const {title,image,price,TeacherId,SubjectId,LevelId,ClassId, goals} = req.body;
        const imageName = req.file ? req.file.pathname : image ;
        const course = new Course({...req.body , image : imageName})
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