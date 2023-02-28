const Admin = require("../models/Admin");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Forum = require("../models/Forum");
const ParentWaiting = require("../models/ParentWaiting");
const Notification = require("../models/Notifications");
const PrivateSchool = require("../models/PrivateSchool");

module.exports.registerAdmin = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const admin = await Admin.findOne({ where: { email: email } });
    if (admin) {
      const error = new Error("الايميل مستخدم");
      error.statusCode = 403;
      throw error;
    }
    const hashPass = await bcrypt.hash(password, 12);
    const newAdmin = await Admin.create({
      email: email,
      password: hashPass,
      name: name,
    });
    await newAdmin.save();
    res.status(200).json({ message: "تم انشاء حساب الأدمن" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.loginAdmin = async (req, res, next) => {
  const { email, password: pass } = req.body;
  try {
    const currentAdmin = await Admin.findOne({ where: { email: email } });
    if (!currentAdmin) {
      const error = new Error("الايميل غير موجود");
      error.statusCode = 422;
      throw error;
    }
    const isPasswordMatch = await bcrypt.compare(pass, currentAdmin.password);
    if (!isPasswordMatch) {
      const error = new Error("كلمة السر غير صحيحة");
      error.statusCode = 422;
      throw error;
    }
    const { password, ...other } = { ...currentAdmin.toJSON() };
    const token = jwt.sign(
      {
        adminId: currentAdmin.id,
      },
      "token"
    );
    res.status(200).json({ Admin: other, token: token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.registerPrivateSchool = async (req, res, next) => {
  try {
    const {
      email,
      name,
      password,
      course,
      exam,
      forum,
      group,
      lesson,
      psycho,
      subject,
      unit,
    } = req.body;
    const privateSchool = await PrivateSchool.findOne({ where: { email } });
    if (privateSchool) {
      const error = new Error("الايميل مستخدم");
      error.statusCode = 403;
      throw error;
    }
    const hashPass = await bcrypt.hash(password, 12);
    const newPrivateSchool = await PrivateSchool.create({
      email,
      password: hashPass,
      name,
      course,
      exam,
      forum,
      group,
      lesson,
      psycho,
      subject,
      unit,
    });
    await newPrivateSchool.save();
    res.status(200).json({ message: "تم انشاء حساب المدرسة الخاصة" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.findAll({ include: { all: true } });
    res.status(200).json({ students });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.getAllForums = async (req, res, next) => {
  try {
    const forums = await Forum.findAll({ include: { all: true } });
    res.status(200).json({ forums });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.getStudent = async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findOne({
      where: { id: studentId },
      include: { all: true },
    });
    res.status(200).json({ student });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.getForum = async (req, res, next) => {
  const { forumId } = req.params;
  try {
    const forum = await Forum.findOne({
      where: { id: forumId },
      include: { all: true },
    });
    res.status(200).json({ forum });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.updateStudentInfo = async (req, res, next) => {
  try {
    const { id, name, email } = req.body;
    const student = await Student.findOne({ where: { id: id } });
    if (!student) {
      const error = new Error("الطالب غير موجود");
      error.statusCode = 404;
      throw error;
    }
    const studentWithEmail = await Student.findOne({ where: { email: email } });
    if (studentWithEmail && studentWithEmail.id !== id) {
      const error = new Error("الإيميل مستخدم");
      error.statusCode = 402;
      throw error;
    }
    student.name = name;
    student.email = email;
    await student.save();
    res.status(201).json({ message: "تم تعديل بيانات الطالب" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.updateForumInfo = async (req, res, next) => {
  try {
    const { id, title } = req.body;
    const forum = await Forum.findOne({ where: { id: id } });
    if (!forum) {
      const error = new Error("النادي غير موجود");
      error.statusCode = 404;
      throw error;
    }
    forum.title = title;
    await forum.save();
    res.status(201).json({ message: "تم تعديل بيانات النادي" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.updateStudentPassword = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const student = await Student.findOne({ where: { id: id } });
    if (!student) {
      const error = new Error("الطالب غير موجود");
      error.statusCode = 404;
      throw error;
    }
    const hashPass = await bcrypt.hash(password, 12);
    student.password = hashPass;
    await student.save();
    res.status(201).json({ message: "تم تعديل كلمة المرور" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.getAllParentWaiting = async (req, res, next) => {
  try {
    const list = await ParentWaiting.findAll({
      where: { status: 0 },
      include: { all: true },
    });
    res.status(200).json({ list });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.getAllParentWaitingHistory = async (req, res, next) => {
  try {
    const list = await ParentWaiting.findAll({
      where: { status: 1, status: 2 },
      include: { all: true },
    });
    res.status(200).json({ list });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.acceptParentRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    const parentRequest = await ParentWaiting.findOne({ where: { id: id } });
    parentRequest.status = 2;
    await parentRequest.save();
    const student = await Student.findOne({
      where: { id: parentRequest.StudentId },
    });
    student.ParentId = parentRequest.ParentId;
    await student.save();
    const newNotifucation = await Notification.create({
      title: `تم قبول طلبك في اضافة الطالب ${student.name}`,
      seen: false,
      ParentId: parentRequest.ParentId,
    });
    await newNotifucation.save();
    res.status(201).json({ message: "تم قبول طلب اضافة الإبن للأب" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.rejectParentRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    const parentRequest = await ParentWaiting.findOne({ where: { id: id } });
    parentRequest.status = 1;
    await parentRequest.save();
    const student = await Student.findOne({
      where: { id: parentRequest.StudentId },
    });
    const newNotifucation = await Notification.create({
      title: `تم رفض طلبك في اضافة الطالب ${student.name}`,
      seen: false,
      ParentId: parentRequest.ParentId,
    });
    await newNotifucation.save();
    res.status(201).json({ message: "تم رفض طلب اضافة الإبن للأب" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
