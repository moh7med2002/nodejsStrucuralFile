const Unit = require('../models/Unit');


exports.createUnitByPrivateSchool = async(req,res,next)=>
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


exports.createUnitByTeacher = async(req,res,next)=>
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


module.exports.getUnitExams = async (req,res,next) => {
    const {unitId} = req.params;
    try{
        const unit = await Unit.findOne({where:{id:unitId}}); 
        if(!unit)
        {
            const error = new Error('الوحدة غير موجود')
            error.statusCode = 404
            throw error;
        }
        const exams = await unit.getExams();
        res.status(200).json({exams : exams});
    } 
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.updateUnitByPrivateSchool = async (req,res , next)=>{
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


module.exports.updateUnitByTeacher = async (req,res , next)=>{
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


module.exports.deleteUnitByPrivateSchool = async (req,res,next)=>{
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

module.exports.deleteUnitByteacher = async (req,res,next)=>{
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