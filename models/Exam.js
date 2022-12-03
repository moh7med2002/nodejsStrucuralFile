const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Exam = Seqalize.define('Exam' , {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        required: true
    },
    questionsNumber:{
        type:DataTypes.INTEGER,
        required:true
    },
    duration:{
        type:DataTypes.INTEGER,
        required:true
    }
});

module.exports = Exam;