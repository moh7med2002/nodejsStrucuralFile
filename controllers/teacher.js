const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Forum = require("../models/Forum");
const Post = require("../models/Post");

module.exports.registerTeacher = async (req, res, next) => {
  try {
    const { name, email, password, gender, phone } = req.body;
    const teacher = await Teacher.findOne({ where: { email: email } });
    if (teacher) {
      const error = new Error("الإيميل مستخدم");
      error.statusCode = 403;
      throw error;
    }
    const hashPass = await bcrypt.hash(password, 12);
    const newTeacher = await Teacher.create({
      email: email,
      password: hashPass,
      name: name,
      gender: gender,
      phone: phone,
    });
    await newTeacher.save();
    res.status(200).json({ message: "تم انشاء حساب المعلم" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.loginTeacher = async (req, res, next) => {
  const { email, password: pass } = req.body;
  try {
    const currentTeacher = await Teacher.findOne({ where: { email: email } });
    if (!currentTeacher) {
      const error = new Error("الايميل غير موجود");
      error.statusCode = 422;
      throw error;
    }
    const isPasswordMatch = await bcrypt.compare(pass, currentTeacher.password);
    if (!isPasswordMatch) {
      const error = new Error("كلمة السر غير صحيحة");
      error.statusCode = 422;
      throw error;
    }
    const { password, ...other } = { ...currentTeacher.toJSON() };
    const token = jwt.sign(
      {
        teacherId: currentTeacher.id,
      },
      "token"
    );
    res.status(200).json({ teacher: other, token: token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).json({ teachers });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.getTeacherCourses = async (req, res, next) => {
  const teacherId = req.teacherId;
  try {
    const coures = await Course.findAll({
      where: { TeacherId: teacherId },
      include: { all: true },
    });
    res.status(200).json({ coures });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
module.exports.getTeacherForum = async (req, res, next) => {
  const teacherId = req.teacherId;
  try {
    const forums = await Forum.findAll({
      where: { TeacherId: teacherId },
      include: { all: true },
    });
    res.status(200).json({ forums });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTeacher = async(req,res,next)=>
{
  try{
    const {teacherId} = req.params
    const teacher = await Teacher.findOne({where:{id:teacherId}})
    res.status(200).json({teacher})
  }
  catch(err)
  {
    if(!err.statusCode)
    {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.updateTeacherImage = async(req,res,next)=>
{
  const teacherId = req.teacherId
  try{
    if (!req.file) {
      const error = new Error("الصورة غير موجودة");
      error.statusCode = 401;
      throw error;
    }
    const teacher = await Teacher.findOne({ where: { id: teacherId } });
    if (teacher.image) {
      clearImage(teacher.image);
    }
    teacher.image = req.file.filename;
    await teacher.save();
    res.status(201).json({ message: "تم تعديل صورة بنجاح", teacher});
  }
  catch(err)
  {
    if(!err.statusCode)
    {
      err.statusCode = 500
    }
    next(err)
  }
}

/** delete image from folder images */
const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", `images/${filePath}`);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};

module.exports.getTeacherForums = async (req, res, next) => {
  const teacherId = req.teacherId;
  try {
    const forums = await Forum.findAll({
      where: { TeacherId: teacherId },
      include: { all: true },
    });
    res.status(200).json({ forums });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};