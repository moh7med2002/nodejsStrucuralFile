const Membership = require("../models/Membership");
const StudentMembership = require("../models/StudentMembership");

exports.craeteMembership = async (req, res, next) => {
  const { title } = req.body;
  try {
    const currMembership = await Membership.findOne({
      where: { title },
      include: { all: true },
    });
    if (currMembership) {
      const error = new Error("العضوية موجودة");
      error.statusCode = 422;
      throw error;
    }
    const newMembership = await Membership.create({
      title,
    });
    await newMembership.save();
    res.status(200).json({ message: "تم اضافة العضوية بنجاح" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.addMembership = async (req, res, next) => {
  try {
    const studentId = req.params;
    const { membershipId, duration } = req.body;
    const currMembership = await Membership.findOne({
      where: { id: membershipId },
      include: { all: true },
    });
    if (!currMembership) {
      const error = new Error("العضوية غير موجودة");
      error.statusCode = 422;
      throw error;
    }
    const start_date = new Date();
    const end_date = new Date();
    end_date.setMonth(start_date.getMonth() + duration);
    const newStduentMembership = await StudentMembership.create({
      membershipId,
      studentId,
      start_date,
      end_date,
    });
    await newStduentMembership.save();
    res.status(200).json({ message: "تم اضافة العضوية للطالب بنجاح" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
