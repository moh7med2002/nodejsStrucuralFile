const Group = require('../models/Group');
const GroupLesson = require('../models/GroupLesson');
const Subject = require('../models/Subject');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher')



module.exports.getGroupsForStudent = async (req,res,next) => {
    const studentId = req.studentId;
    try{
        const student = await Student.findOne({where:{id:studentId}});
        if(!student){
            const error = new Error('يرجى تسجيل الدخول');
            error.statusCode = 422;
            throw error;
        }
        const groups = await Group.findAll({
            where:{LevelId:student.LevelId, ClassId:student.ClassId , SectionId : student.SectionId},include:{all:true}
        });
        res.status(200).json({groups});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

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
        const lessons = await GroupLesson.findAll({where:{GroupeId:groupId}});
        res.status(200).json({lessons:lessons ,});
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
            title , day , meetLink , startTime , EndTime , GroupeId:GroupId , status:0
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


module.exports.registerGroup = async (req,res,next) =>{
    const studentId = req.studentId;
    const {groupId} = req.params;
    try{
        const group = await Group.findOne({where: {id : groupId}});
        const student = await Student.findOne({where : {id : studentId}});
        const registerd_students = group.registerStudents || 0;
        if(group.allowedStudents <= registerd_students){
            const error = new Error('فشل الإشتراك . العدد مكتمل');
            error.statusCode = 422;
            throw error;
        }
        if(group.price > student.money){
            const error = new Error('المبلغ غير كافي');
            error.statusCode = 422;
            throw error;
        }
        await group.addStudent(student);
        student.money -= group.price;
        group.registerStudents += 1;
        await group.save();
        await student.save(); 
        res.status(201).json({message:"تم الإشتراك في المجموعة بنجاح"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.getStudentRegisterGroups = async (req,res,next) => {
    const studentId = req.studentId; 
    try{
        const student = await Student.findOne({where : {id : studentId} , 
            include: [{
                model: Group,
                include:[{
                    model : Teacher,
                    attributes: {
                        exclude: ['password']
                      }
                }]
              }]
        });
        res.status(200).json({groups: student.Groupes});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getGroupsForTeacher = async (req,res,next) => {
    const teacherId = req.teacherId;
    try{
        const groups = await Group.findAll({where:{TeacherId:teacherId}, include:{all:true}});
        res.status(200).json({groups});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}