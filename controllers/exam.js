const Exam = require('../models/Exam');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const seqalize  = require('../util/database');
const Grade = require('../models/Grade');
const Student = require('../models/Student');


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
            const isRight = +rightAnswer === 1;
            const answerOne = await Answer.create({title:answer1, QuestionId:newQuestion.id , isRight});
        }
        if(answer2){
            const isRight = +rightAnswer === 2;
            const answerTwo = await Answer.create({title:answer2, QuestionId:newQuestion.id , isRight});
        }
        if(answer3){
            const isRight = +rightAnswer === 3;
            const answerThree = await Answer.create({title:answer3, QuestionId:newQuestion.id , isRight});
        }
        if(answer4){
            const isRight = +rightAnswer === 4;
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

module.exports.updateQuestion = async (req,res,next) =>{
    const {questionId} = req.params;
    const {question ,answer1Id, answer1 , answer2Id ,answer2 , answer3Id ,answer3 , answer4Id ,answer4 , rightAnswer} = req.body;
    try{
        const foundQuestion = await Question.findOne({where:{id:questionId}});
        foundQuestion.title = question;
        await foundQuestion.save();
        if(answer1){
            if(answer1Id){
                const isRight = +rightAnswer === 1;
                const answerOne = await Answer.findOne({where: {id : answer1Id}});
                answerOne.title = answer1;
                answerOne.isRight = isRight;
                await answerOne.save();
            }
            else{
                const isRight = +rightAnswer === 1;
                const answerOne = await Answer.create({title:answer3, QuestionId:questionId , isRight});
            }
        }
        if(answer2){
            if(answer2Id){
                const isRight = +rightAnswer === 2;
                const answerTwo = await Answer.findOne({where: {id : answer2Id}});
                answerTwo.title = answer2;
                answerTwo.isRight = isRight;
                await answerTwo.save();
            }
            else{
                const isRight = +rightAnswer === 2;
                const answerTwo = await Answer.create({title:answer3, QuestionId:questionId , isRight});
            }
        }
        if(answer3){
            if(answer3Id){
                const isRight = +rightAnswer === 3;
                const answerThree = await Answer.findOne({where: {id : answer3Id}});
                answerThree.title = answer3;
                answerThree.isRight = isRight;
                await answerThree.save();
            }
            else{
                const isRight = +rightAnswer === 3;
                const answerThree = await Answer.create({title:answer3, QuestionId:questionId , isRight});
            }
        }
        if(answer4){
            if(answer4Id){
                const isRight = +rightAnswer === 4;
                const answerFour = await Answer.findOne({where: {id : answer4Id}});
                answerFour.title = answer4;
                answerFour.isRight = isRight;
                await answerFour.save();
            }
            else{
                const isRight = +rightAnswer === 4;
            const answerFour = await Answer.create({title:answer4, QuestionId:questionId , isRight});
            }
        }
        res.status(201).json({message:"تم تعديل السؤال"})
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
        const grade = await Grade.findOne({where:{StudentId:req.studentId , ExamId:ExamId}});
        if(grade){
            return res.status(200).json({grade , hasExam:true});
        }
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
        res.status(200).json({exam , hasExam:false});
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
    const examId = req.params.examId;
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


module.exports.getAllowedExamsForStudent = async (req,res,next) =>{
    const studentId = req.studentId;
    try{
        const student = await Student.findOne({where : {id : studentId}});
        const courses = await student.getCourses();
        let units = [];
        for (const course of courses) {
            const unit_s = await course.getUnits();
            const newUnits = [...units , ...unit_s];
            units = newUnits;
        }
        let exams = [];
        for (const unit of units) {
            const exam_s = await unit.getExams();
            const newExams = [...exams , ...exam_s];
            exams = newExams;
        }
        res.status(200).json({exams});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

module.exports.getExamGradeForTeacher = async (req,res,next) =>{
    const {examId} = req.params;
    try{
        const grades = await Grade.findAll(
            {where:{ExamId:examId},
            include : {all: true},
        });
        res.status(200).json({grades});
    }
    catch(err){
        if(! err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }

}