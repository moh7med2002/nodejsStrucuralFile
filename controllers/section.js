const Section = require('../models/Section');


module.exports.createSection = async (req,res,next)=>{
    const {title , ClassId} = req.body;
    try{
        const section = new Section({title, ClassId})
        await section.save()
        res.status(200).json('تم إنشاء الشعبة الدراسية')
    }
    catch(err)
    {
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}
 
module.exports.getSections = async(req,res,next)=>{
    try{
        const sections = await Section.findAll();
        res.status(200).json({sections:sections});
    }
    catch(err)
    {
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


