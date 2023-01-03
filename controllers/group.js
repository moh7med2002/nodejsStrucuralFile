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
