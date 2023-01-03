const Group = require('../models/Group');
const GroupLesson = require('../models/GroupLesson');
const Subject = require('../models/Subject');


exports.createGroup = async(req,res,next)=>
{
    try{
        const {title,price,TeacherId,SubjectId, goals , allowedStudents , description} = req.body;
        if(!req.file)
        {
            const error = new Error('الصورة غير موجودة')
            error.statusCode = 403
            throw new error
        }
        const subject = await Subject.findOne({where:{id:SubjectId}});
        if(!subject)
        {
            const error = new Error('المادة غير موجودة')
            error.statusCode = 403
            throw new error
        }
        const imageName = req.file.filename;
        const group = new Group({ title:title, image : imageName , SubjectId : SubjectId , LevelId:subject.LevelId , description : description, goals:goals,
            ClassId:subject.ClassId, SectionId:subject.SectionId , price:+price , allowedStudents:+allowedStudents , TeacherId:TeacherId});
        await group.save()
        res.status(201).json('تم انشاء المجموعة')
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.updateGroup = async (req,res,next) => {
    const {groupId} = req.params;
    try{
        const {title , allowedStudents , TeacherId , price , goals , description} = req.body;
        const group = await Group.findOne({where:{id:groupId}});
        if(!group){
            const error = new Error('المجموعة غير موجودة');
            error.statusCode = 409;
            throw error;
        }
        group.title = title;
        group.allowedStudents = + allowedStudents;
        group.TeacherId = TeacherId;
        group.price = + price;
        group.description = description;
        group.goals = goals;
        await group.save();
        res.status(201).json({message:"تم تعديل المجموعة بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}



module.exports.getAllGroupe = async (req,res,next)=>{
    try{
        const groupes = await Group.findAll({include:{all:true}});
        res.status(200).json({groupes:groupes});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getGroupeById = async (req,res,next)=>{
    const {groupId} = req.params;
    try{
        const groupe = await Group.findOne({ where:{id :groupId} ,include:{all:true}});
        res.status(200).json({groupe:groupe});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getAllLesson = async (req,res,next) => {
    const { groupId} = req.params;
    try{
        const lessons = await GroupLesson.findAll({where:{GroupId:groupId}})
        res.status(200).json({lessons:lessons});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.createGroupLesson = async (req,res,next) => {
    const {title, day , meetLink , startTime , EndTime , GroupId} = req.body;
    try{
        const lesson = new GroupLesson({
            title , day , meetLink , startTime , EndTime , GroupId , status:0
        });
        await lesson.save();
        res.status(200).json({message:"تم انشاء الدرس"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.updateeGroupLesson = async (req,res,next) => {
    const {lessonId}  = req.params;
    const {title, day , meetLink , startTime , EndTime} = req.body;
    try{
        const lesson = await GroupLesson.findOne({where:{id:lessonId}});
        lesson.title = title;
        lesson.day = day;
        lesson.meetLink = meetLink;
        lesson.startTime =startTime;
        lesson.EndTime = EndTime;
        await lesson.save();
        res.status(201).json({message:"تم تعديل الدرس بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}