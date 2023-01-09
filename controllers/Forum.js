const Forum = require("../models/Forum");
exports.createForum = async (req, res, next) => {
  try {
    const imageName = req.file.filename;
    const { title, TeacherId } = req.body;

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
