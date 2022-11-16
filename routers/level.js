const express = require('express');
const router = express.Router();
const Level = require('../models/Level')

router.post('/create',async(req,res,next)=>{
    try{
        const {title} = req.body
        const level = new Level({title})
        await level.save()
        res.status(200).json('تم إنشاء المرحلة الدراسية')
    }
    catch(err)
    {
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
})

router.get('/all',async(req,res,next)=>
{
    try{
        const levels = await Level.findAll()
        res.status(200).json({levels:levels})
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