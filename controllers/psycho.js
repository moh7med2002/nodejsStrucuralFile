const Psycho = require('../models/Psycho');

module.exports.createPsycho = async (req,res,next) => {
    try{
        const {title,price,TeacherId,duration , description} = req.body;
        if(!req.file)
        {
            const error = new Error('الصورة غير موجودة')
            error.statusCode = 403
            throw new error
        }
        const imageName = req.file.filename;
        const psycho = new Psycho({image : imageName , price:+price  , title:title , description :description ,duration :+duration  , TeacherId : TeacherId});
        await psycho.save()
        res.status(201).json('تم انشاء الجلسة')
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getAllPsycho = async (req,res,next) => {
    try{
        const psychos = await Psycho.findAll({include:{all:true}});
        res.status(200).json({psychos});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getPsychoById = async (req,res,next) => {
    const {psychoId} = req.params;
    try{
        const psycho = await Psycho.findOne({where:{id:psychoId} , include:{all:true}});
        res.status(200).json({psycho});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getAllPsychoForTeacher = async (req,res,next) => {
    const teacherId = req.teacherId;
    try{
        const psychos = await Psycho.findAll({where:{TeacherId:teacherId}, include:{all:true}});
        res.status(200).json({psychos});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}