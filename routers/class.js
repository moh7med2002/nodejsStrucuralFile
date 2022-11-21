const express = require('express');
const router = express.Router();
const Class = require('../models/Class')

router.post('/create',async(req,res,next)=>{
    try{
        const {title,LevelId} = req.body;
        const cls = new Class({title,LevelId})
        await cls.save()
        res.status(200).json('تم إنشاء الصف')
    }
    catch(err)
    {
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
})

// router.get('/:LevelId/classes',async(req,res,next)=>{
//     try{
//         const {LevelId} = req.params
//         const classes = await Class.findAll({where:{LevelId:LevelId}})
//         res.status(200).json({classes})
//     }
//     catch(err)
//     {
//         if(! err.statusCode){
//             err.statusCode=500;
//         }
//         next(err);
//     }
// })


router.get('/all' ,async(req,res,next)=>{
    try{
        const classes = await Class.findAll()
        res.status(200).json({classes})
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