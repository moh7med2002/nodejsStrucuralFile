const Parent = require('../models/Parent');
const Student = require('../models/Student');
const ParentWaiting = require('../models/ParentWaiting');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.register = async(req,res,next)=>
{
    try{
        const {email , name , password} = req.body;
        const parent = await Parent.findOne({where:{email:email}});
        if (parent){
            const error = new Error ('الايميل مستخدم');
            error.statusCode = 403;
            throw error;
        }
        const hashPass = await bcrypt.hash(password,12);
        const newParent = await Parent.create({
            email:email,
            password:hashPass,
            name:name,
        });
        await newParent.save()
        res.status(200).json({message:'تم انشاء حساب الاب'});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


exports.login = async(req,res,next)=>{
    const {email,password : pass} = req.body;
    try{
        const currentParent = await Parent.findOne({where:{email:email}});
        if(!currentParent){
            const error = new Error('الايميل غير موجود');
            error.statusCode = 422;
            throw error;
        }
        const isPasswordMatch = await bcrypt.compare(pass,currentParent.password);
        if(!isPasswordMatch){
            const error = new Error('كلمة السر غير صحيحة');
            error.statusCode=422;
            throw error;
        };
        const {password,...other} = {...currentParent.toJSON()}
        const token = jwt.sign({
            parentId:currentParent.id,
        },
        "token"
        );
        res.status(200).json({parent:other, token:token});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.getAllStudent = async (req,res,next) => {
    try{
        const students = await Student.findAll();
        res.status(200).json({students});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getHisChild = async (req,res,next) => {
    const parentId = req.parentId;
    try{
        const students = await Student.findAll({where:{ParentId:parentId}, include:{all:true}});
        res.status(200).json({students});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }

}

module.exports.requestStudentToAdd = async (req,res,next) => {
    const parentId = req.parentId;
    const {students} = req.body;
    try{
        for (const std of students) {
            const newRequest =await ParentWaiting.create({
                status:0,
                ParentId : parentId,
                StudentId : std
            });
            await newRequest.save();
        };
        res.status(201).json({message:"تم إضافة طلب الابناء للمراجعة" , students});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}