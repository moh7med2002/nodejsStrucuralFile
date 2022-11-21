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


module.exports.getCourse = async (req,res,next)=>{
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
