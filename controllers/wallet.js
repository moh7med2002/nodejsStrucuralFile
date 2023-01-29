const Wallet = require('../models/Wallet')
const Student = require('../models/Student')
const fs = require('fs');
const path = require('path');


exports.addMoneyForWallet = async(req,res,next)=>
{
    try{
        const {money} = req.body
        const studentId = req.studentId
        if(!req.file)
        {
            const error = new Error('صورة غير موجودة')
            error.statusCode == 401
            throw error
        }
        const wallet = await Wallet.create({StudentId:studentId,money:+money,image:req.file.filename,status:0})
        await wallet.save()
        res.status(201).json({messgae:"تم اضافة المبلغ للإدارة للقبول أو الرفض"})
    }
    catch(err)
    {
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.acceptMoney = async(req,res,next)=>
{
    try{
        const {walletId} = req.params
        const wallet = await Wallet.findOne({where:{id:walletId}})
        const student = await Student.findOne({where:{id:wallet.StudentId}})
        student.money += wallet.money
        await student.save();
        wallet.status = 2;
        await wallet.save();
        res.status(200).json({message:"تم قبول المبلغ من الطالب"})
    }
    catch(err)
    {
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.rejectMoney = async(req,res,next)=>
{
    try{
        const {walletId} = req.params
        const wallet = await Wallet.findOne({where:{id:walletId}})
        wallet.status = 1;
        await wallet.save();
        res.status(200).json({message:"تم رفض المبلغ من الطالب"})
    }
    catch(err)
    {
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.getWallets = async(req,res,next)=>
{
    try{
        const wallets = await Wallet.findAll({include:{model:Student}})
        res.status(200).json({wallets})
    }
    catch(err)
    {
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.getWalletById = async(req,res,next)=>
{
    try{
        const {walletId} = req.params
        const wallet = await Wallet.findOne({where:{id:walletId }, include:{model : Student}})
        res.status(200).json({wallet})
    }
    catch(err)
    {
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

const clearImage=(filePath)=>{
    filePath=path.join(__dirname,'..',`images/${filePath}`);
    fs.unlink(filePath,(err)=>{
        console.log(err);
    })
}