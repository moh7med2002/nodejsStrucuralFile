const Psycho = require('../models/Psycho');
const Student = require('../models/Student');
const PsychoStudent = require('../models/PsychoStudent');
const fs = require('fs');
const path = require('path');

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

module.exports.getAllPsychoForStudent = async (req,res,next) => {
    const studentId = req.studentId;
    try{
        const psychos = await PsychoStudent.findAll({where:{StudentId:studentId , status:1}, include:{all:true}});
        res.status(200).json({psychos});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.updatePsycho = async (req,res,next) => {
    const {title,price,duration , description} = req.body;
    const {psychoId} = req.params;
    try{
        const psycho = await Psycho.findOne({where:{id:psychoId}});
        psycho.title = title;
        psycho.price = +price;
        psycho.duration = +duration;
        psycho.description = description;
        await psycho.save();
        res.status(201).json({message:"تم تعديل الجلسة بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.deletePsycho =async (req,res,next) => {
    const {psychoId} = req.params;
    try{
        const psycho = await Psycho.findOne({where:{id:psychoId}});
        if(psycho.image){
            clearImage(psycho.image);
        }
        await psycho.destroy(); 
        res.status(200).json({message:"تم حذف الجلسة"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
} 


module.exports.registerPsycho = async (req,res,next) => {
    const {psychoId , studentId , description} = req.body;
    try{
        const student = await Student.findOne({where:{id:studentId}});
        const psycho = await Psycho.findOne({where:{id:psychoId}});
        const foundRegiseredPsycho = await PsychoStudent.findOne({where:{StudentId:studentId , PsychoId:psychoId}});
        if(foundRegiseredPsycho){
            return res.status(401).json({isRegister:true ,message:"تم طلب هذه الجلسة مسبقا"})
        }
        if(psycho.price > student.money){
            const error = new Error('المبلغ غير كافي');
            error.statusCode = 422;
            throw error;
        }
        const regiseredPsycho = new PsychoStudent({description:description , StudentId:studentId , PsychoId:psychoId});
        await regiseredPsycho.save();
        res.status(201).json({message:"تم طلب الجلسة بنجاح" , isRegister:false})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.acceptPsycho = async (req,res,next) => {
    const {requestPsycho , startTime , startDate , meetLink} = req.body;
    try{
        const foundRegiseredPsycho = await PsychoStudent.findOne({where:{id:requestPsycho}});
        const student = await Student.findOne({where:{id:foundRegiseredPsycho.StudentId}});
        const psycho = await Psycho.findOne({where:{id:foundRegiseredPsycho.PsychoId}});
        if(psycho.price > student.money){
            const error = new Error('المبلغ غير كافي');
            error.statusCode = 422;
            throw error;
        }
        student.money -= psycho.price;
        await student.save();
        foundRegiseredPsycho.status = 1;
        foundRegiseredPsycho.startTime = startTime;
        foundRegiseredPsycho.startDate = startDate;
        foundRegiseredPsycho.meetLink = meetLink;
        await foundRegiseredPsycho.save();
        res.status(201).json({message:"تم الموافقة على الجلسة بنجاح"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.getAcceptedPsycho = async (req,res,next) => {
    const {psychoId} = req.params;
    try{
        const psychos = await PsychoStudent.findAll({where:{PsychoId:psychoId , status:1} , include:{all:true}})
        res.status(200).json({psychos})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getrequestededPsycho = async (req,res,next) => {
    const {psychoId} = req.params;
    try{
        const psychos = await PsychoStudent.findAll({where:{PsychoId:psychoId , status:0} , include:{all:true}})
        res.status(200).json({psychos})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.rejectPsycho = async (req,res,next) => {
    const {requestPsycho} = req.body;
    try{
        const foundRegiseredPsycho = await PsychoStudent.findOne({where:{id:requestPsycho}});
        await foundRegiseredPsycho.destroy();
        res.status(201).json({message:"تم رفض على الجلسة بنجاح"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

const clearImage=(filePath)=>{
    filePath=path.join(__dirname,'..',`images/${filePath}`);
    fs.unlink(filePath,(err)=>{
        console.log(err);
    })
}