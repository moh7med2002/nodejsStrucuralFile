const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject')

router.post('/create',async(req,res,next)=>{
    try{
        const {title,ClassId,LevelId} = req.body
        const subject = new Subject({title,ClassId,LevelId})
        await subject.save()
        res.status(200).json('تم إنشاء المادة ')
    }
    catch(err)
    {
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
})

router.get('/level/:LevelId/class/:ClassId/all',async(req,res,next)=>
{
    try{
        const {LevelId,ClassId} = req.params
        const subjects = await Subject.findAll({where:{ClassId:ClassId,LevelId:LevelId}})
        res.status(200).json({subjects:subjects})
    }
    catch(err)
    {
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
})

module.exports = router;