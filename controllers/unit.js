const Unit = require('../models/Unit');


exports.createUnit = async(req,res,next)=>
{
    try{
        const {title,CourseId} = req.body
        const unit = new Unit(req.body)
        await unit.save()
        res.status(201).json('تم انشاء الوحدة')
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.getCourseUnit = async (req,res,next)=>{
    const {courseId} = req.params;
    try{
        const units = await Unit.findAll({where:{CourseId:courseId}});
        res.status(201).json({units:units});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.getUnits = async (req,res,next)=>{
    try{
        const units = await Unit.findAll();
        res.status(201).json({units:units});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
} 


module.exports.updateUnit = async (req,res , next)=>{
    const {unitId} = req.params;
    const {title} = req.body;
    try{
        const unit = await Unit.findOne({where:{id:unitId}});
        if(!unit)
        {
            const error = new Error('الوحدة غير موجود')
            error.statusCode = 404
            throw error;
        }
        unit.title = title;
        await unit.save();
        res.status(201).json({message:"تم تحديث الوحدة بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.deleteUnit = async (req,res,next)=>{
    const {unitId} = req.params;
    try{
        const unit = await Unit.findOne({where:{id:unitId}});
        if(!unit)
        {
            const error = new Error('الوحدة غير موجود')
            error.statusCode = 404
            throw error;
        }
        await unit.destroy();
        res.status(201).json({message:"تم حذف الوحدة بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}