const Lesson = require('../models/Lesson')
exports.createUnit = async(req,res,next)=>
{
    try{
        const {title,UnitId} = req.body
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

