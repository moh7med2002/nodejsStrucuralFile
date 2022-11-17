const Course = require('../models/Course')
exports.createCourse = async(req,res,next)=>
{
    try{
        const {title,image,price,TeacherId,SubjectId,LevelId,ClassId} = req.body
        const course = new Course(req.body)
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

