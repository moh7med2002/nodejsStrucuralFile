const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Question = Seqalize.define('Question' , {
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
});

module.exports = Question;