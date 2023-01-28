const Forum = require("../models/Forum");
exports.createForum = async (req, res, next) => {
  try {
    const imageName = req.file.filename;
    const { title, TeacherId, subjectId } = req.body;

    if (req.adminId) {
      const forum = new Forum({ ...req.body, image: imageName });
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
  console.log("forumId : fffffffffffffff", forumId);
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
