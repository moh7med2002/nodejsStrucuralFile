const Forum = require("../models/Forum");
const Student = require("../models/Student");
const Subject = require('../models/Subject');
const Teacher = require("../models/Teacher");

exports.createForum = async (req, res, next) => {
  try {
    const imageName = req.file.filename;
    const { title, TeacherId, SubjectId } = req.body;
    console.log(req.body);
    if (req.privateSchoolId) {
      const subject = await Subject.findOne({where:{id:SubjectId}});
        if(!subject)
        {
            const error = new Error('المادة غير موجودة')
            error.statusCode = 403
            throw new error
        }
      const forum = new Forum({
        TeacherId : TeacherId, SubjectId:SubjectId , image: imageName , title:title ,
        LevelId:subject.LevelId , ClassId:subject.ClassId, SectionId:subject.SectionId 
      });
      await forum.save();
      res.status(201).json("تم انشاء النادي");
    } else {
      throw new Error("unauthorized");
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.deleteForum = async (req, res, next) => {
  const { forumId } = req.params;
  try {
    const forum = await Forum.findOne({ where: { id: forumId } });
    console.log("forum: ", forum);
    if (!forum) {
      const error = new Error("النادي غير موجود");
      error.statusCode = 404;
      throw error;
    }
    await forum.destroy();
    res.status(201).json({ message: "تم حذف النادي بنجاح" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.getForum = async (req,res,next) => {
  const {forumId} = req.params;
  try{
      const forum = await Forum.findOne({where : {id : forumId}, include:{all:true}});
      res.status(200).json({forum});
  }
  catch(err){
      if(! err.statusCode){
          err.statusCode=500;
      }
      next(err);
  }
}

module.exports.getStudentRegisterForums = async (req,res,next) => {
  const studentId = req.studentId; 
  try{
      const student = await Student.findOne({where : {id : studentId} , 
          include: [{
              model: Forum,
              include:{all:true}
            }]
      });
      res.status(200).json({forums: student.Forums});
  }
  catch(err){
      if(! err.statusCode){
          err.statusCode=500;
      }
      next(err);
  }
}