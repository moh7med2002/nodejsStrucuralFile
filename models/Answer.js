const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Answer = Seqalize.define('Answer' , {
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
    isRight:{
        type:DataTypes.BOOLEAN,
        required:true
    }
});

module.exports = Answer;