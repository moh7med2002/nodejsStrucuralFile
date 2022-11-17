const Unit = require('../models/Unit')
exports.createUnit = async(req,res,next)=>
{
    try{
        const {title,courseId} = req.body
        const unit = new Unit(req.body)
        await unit.save()
        res.status(201).json('تم انشاء الوحدة')
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

