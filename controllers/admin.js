const Admin = require('../models/Admin');
const Student = require('../models/Student')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.registerAdmin = async(req,res,next)=>
{
    try{
        const {email , name , password} = req.body;
        const admin = await Admin.findOne({where:{email:email}});
        if (admin){
            const error = new Error ('الايميل مستخدم');
            error.statusCode = 403;
            throw error;
        }
        const hashPass = await bcrypt.hash(password,12);
        const newAdmin = await Admin.create({
            email:email,
            password:hashPass,
            name:name,
        });
        await newAdmin.save()
        res.status(200).json({message:'تم انشاء حساب الأدمن'});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


exports.loginAdmin = async(req,res,next)=>{
    const {email,password : pass} = req.body;
    try{
        const currentAdmin = await Admin.findOne({where:{email:email}});
        if(!currentAdmin){
            const error = new Error('الايميل غير موجود');
            error.statusCode = 422;
            throw error;
        }
        const isPasswordMatch = await bcrypt.compare(pass,currentAdmin.password);
        if(!isPasswordMatch){
            const error = new Error('كلمة السر غير صحيحة');
            error.statusCode=422;
            throw error;
        };
        const {password,...other} = {...currentAdmin.toJSON()}
        const token = jwt.sign({
            adminId:currentAdmin.id,
        },
        "token"
        );
        res.status(200).json({Admin:other, token:token});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.getAllStudents = async (req,res,next) =>{
    try{
        const students = await Student.findAll({include:{all:true}});
        res.status(200).json({students});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.getStudent = async (req,res,next) => {
    const {studentId} = req.params;
    try{
        const student = await Student.findOne({where : {id : studentId}, include:{all:true}});
        res.status(200).json({student});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.updateStudentInfo = async (req,res,next) =>{
    try{
        const {id,name , email} = req.body
        const student = await Student.findOne({where:{id:id}})
        if(!student)
        {
            const error = new Error('الطالب غير موجود')
            error.statusCode = 404
            throw error
        }
        student.name = name
        student.email = email
        await student.save()
        res.status(201).json({message:"تم تعديل بيانات الطالب"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.updateStudentPassword = async (req,res,next) => {
    try{
        const {id,password} = req.body
        const student = await Student.findOne({where:{id:id}})
        if(!student)
        {
            const error = new Error('الطالب غير موجود')
            error.statusCode = 404
            throw error
        }
        const hashPass = await bcrypt.hash(password,12)
        student.password = hashPass
        await student.save()
        res.status(201).json({message:"تم تعديل كلمة المرور"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}