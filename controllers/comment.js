const Comment = require("../models/Comment");

exports.addComment = async(req,res,next)=>
{
    const {postId} = req.params;

    try{
        if(req.body.TeacherId){
            const {text, TeacherId} = req.body
        }else {
            const {text, StudentId} = req.body
        }       
        const comment = new Comment({...req.body, PostId: postId })
        await comment.save()
        res.status(201).json('تم انشاء التعليق')
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
};

module.exports.deleteComment = async (req,res,next)=>{
    const {postId} = req.params;

    try{
        const comment = await Comment.findOne({where:{id:commentId}});
        if(!comment){
            const error = new Error('التعليق غير موجود')
            error.statusCode = 404
            throw error;
        }
        await comment.destroy();
        res.status(201).json({message:"تم حذف التعليق بنجاح"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getAllComment = async (req,res,next) => {
    const {postId} = req.params;
    console.log('postId: ', postId);
    try{
        const comments = await Comment.findAll({
            where:{PostId: postId },
            include:{ all : true}
        });
        res.status(200).json({comments});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}