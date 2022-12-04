const Exam = require('../models/Exam');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const seqalize  = require('../util/database');
const Grade = require('../models/Grade');


exports.createExam = async(req,res,next)=>
{
    try{
        const {title,duration,UnitId , questionsNumber} = req.body
        const exam = await Exam.create({title,duration,UnitId , questionsNumber:+questionsNumber});
        res.status(201).json({message:"تم انشاء الاختبار"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.createQuestion = async(req,res,next)=>{
    const {examId} = req.params;
    const {question , answer1 , answer2 , answer3 , answer4 , rightAnswer} = req.body;
    try{
        const newQuestion = await Question.create({title:question ,ExamId:examId});
        if(answer1){
            const isRight = answer1 === rightAnswer;
            const answerOne = await Answer.create({title:answer1, QuestionId:newQuestion.id , isRight});
        }
        if(answer2){
            const isRight = answer2 === rightAnswer;
            const answerTwo = await Answer.create({title:answer2, QuestionId:newQuestion.id , isRight});
        }
        if(answer3){
            const isRight = answer3 === rightAnswer;
            const answerThree = await Answer.create({title:answer3, QuestionId:newQuestion.id , isRight});
        }
        if(answer4){
            const isRight = answer4 === rightAnswer;
            const answerFour = await Answer.create({title:answer4, QuestionId:newQuestion.id , isRight});
        }
        res.status(201).json({message:"تم انشاء السؤال"})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.updateExam = async (req,res,next) => {
    const {examId} = req.params;
    const {title,duration , questionsNumber} = req.body;
    try{
        const exam = await Exam.findOne({where:{id:examId}});
        exam.title = title;
        exam.duration = duration;
        exam.questionsNumber = questionsNumber;
        await exam.save();
        res.status(201).json({message : "تم تعديل الإختبار"});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.getExam = async(req,res,next)=>
{
    try{
        const {ExamId} = req.params;
        const exam = await Exam.findOne({where:{id:ExamId}});
        const questions = await exam.getQuestions();
        const NewQuestions = []
        for(const question of questions)
        {
            const answers = await question.getAnswers()
            NewQuestions.push({...question.toJSON(),answers})
        }
        res.status(200).json({...exam.toJSON(),questions:NewQuestions})
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.getExamForStudent = async(req,res,next)=>
{
    try{
        const {ExamId} = req.params;
        const foundExam = await Exam.findOne({where:{id:ExamId}});
        const exam = await Exam.findOne({
            where:{id:ExamId},
            include:{
                model:Question,
                separate:true,
                order:seqalize.random(),
                limit:foundExam.questionsNumber,
                include:{
                    model:Answer,
                    separate:true,
                    order:seqalize.random(),
                }
            },
        });
        res.status(200).json({exam});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


module.exports.markExam = async(req,res,next)=>{
    const {answers} = req.body;
    const studentId = req.studentId;
    const examId = req.examId;
    let TotalMark = 0;
    try{
        const foundExam = await Exam.findOne({where:{id:examId}});
        for (const answer of answers) {
            const fetchedAnswer = await Answer.findOne({where:{id:answer.answer}});
            if(fetchedAnswer.isRight){
                TotalMark+=1;
            }
        }
        const grade = await Grade.create({StudentId:studentId , ExamId:examId , studentGrade:TotalMark , totalGrade : foundExam.questionsNumber});
        res.status(200).json({message:"تم تصليح الإختبار" , grade :TotalMark , totalGrade:foundExam.questionsNumber});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}