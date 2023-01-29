const Post = require("../models/Post");

exports.addPost = async (req, res, next) => {
  const { forumId } = req.params;

  try {
    const id = req.teacherId ? req.teacherId : req.studentId;
    const post = req.teacherId
      ? new Post({ ...req.body, TeacherId: id, ForumId: forumId })
      : new Post({ ...req.body, StudentId: id, ForumId: forumId });

    await post.save();
    res.status(201).json("تم انشاء البوست");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findOne({ where: { id: postId } });
    console.log("post: ", post);
    if (!post) {
      const error = new Error("البوست غير موجود");
      error.statusCode = 404;
      throw error;
    }
    await post.destroy();
    res.status(201).json({ message: "تم حذف البوست بنجاح" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports.getAllPost = async (req, res, next) => {
  const { forumId } = req.params;
  try {
    const posts = await Post.findAll({
      where: { ForumId: forumId },
      include: { all: true },
    });
    res.status(200).json({ posts });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
