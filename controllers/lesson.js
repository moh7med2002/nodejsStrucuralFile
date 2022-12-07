const Lesson = require('../models/Lesson')
exports.createLessonByAdmin = async(req,res,next)=>
{
    try{
        const {title,UnitId, videoUrl , content} = req.body
        const lesson = new Lesson(req.body)
        await lesson.save()
        res.status(201).json('تم انشاء الدرس')
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
};


exports.createLessonByTeacher = async(req,res,next) =>{
    try{
        const {title,UnitId, videoUrl , content} = req.body
        const lesson = new Lesson(req.body)
        await lesson.save()
        res.status(201).json('تم انشاء الدرس')
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.updateLessonByAdmin = async (req,res,next)=>{
    const {lessonId} = req.params;
    const {title , videoUrl , content} = req.body;
    try{
        const lesson = await Lesson.findOne({where:{id:lessonId}});
        if(!lesson){
            const error = new Error('الدرس غير موجود')
            error.statusCode = 404
            throw error;
        }
        lesson.title = title;
        lesson.videoUrl = videoUrl;
        lesson.content = content;
        await lesson.save();
        res.status(201).json({message:"تم تعديل الدرس بنجاح"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
} 

module.exports.deleteLesson = async (req,res,next)=>{
    const {lessonId} = req.params;
    try{
        const lesson = await Lesson.findOne({where:{id:lessonId}});
        if(!lesson){
            const error = new Error('الدرس غير موجود')
            error.statusCode = 404
            throw error;
        }
        await lesson.destroy();
        res.status(201).json({message:"تم حذف الدرس بنجاح"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}



module.exports.getUnitLesson = async(req,res,next)=>{
    const {unitId} = req.params;
    try{
        const lessons = await Lesson.findAll({where:{UnitId:unitId}});
        res.status(200).json({lessons:lessons});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getSingleLesson = async (req,res,next) => {
    const {lessonId} = req.params;
    try{
        const lesson = await Lesson.findOne({where:{id : lessonId}});
        res.status(200).json({lesson});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}