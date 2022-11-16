const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.registerStudent = async(req,res,next)=>
{
    try{
        const {name , email , password , gender , LevelId, ClassId} = req.body;
        const student = await Student.findOne({where:{email:email}});
        if (student){
            const error = new Error ('الايميل مستخدم');
            error.statusCode = 403;
            throw error;
        }
        const hashPass = await bcrypt.hash(password,12);
        const newStudent = await Student.create({
            email:email,
            password:hashPass,
            name:name,
            LevelId:LevelId,
            ClassId:ClassId,
            gender:gender
        });
        await newStudent.save()
        res.status(200).json({message:'تم انشاء حساب الطالب'});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


exports.loginStudent = async(req,res,next)=>{
    const {email,password : pass} = req.body;
    try{
        const currentStudent = await Student.findOne({where:{email:email}});
        if(!currentStudent){
            const error = new Error('الايميل غير موجود');
            error.statusCode = 422;
            throw error;
        }
        const isPasswordMatch = await bcrypt.compare(pass,currentStudent.password);
        if(!isPasswordMatch){
            const error = new Error('كلمة السر غير صحيحة');
            error.statusCode=422;
            throw error;
        };
        const {password,...other} = {...currentStudent.toJSON()}
        const token = jwt.sign({
            studentId:currentStudent.id,
        },
        "token"
        );
        res.status(200).json({student:other, token:token});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}
