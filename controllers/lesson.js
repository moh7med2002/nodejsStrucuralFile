const Lesson = require('../models/Lesson')
exports.createLesson = async(req,res,next)=>
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


module.exports.updateLesson = async (req,res,next)=>{
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