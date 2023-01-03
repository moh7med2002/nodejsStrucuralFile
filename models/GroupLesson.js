const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const GroupLesson = Seqalize.define('GroupLesson' , {
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
    meetLink:{
        type:DataTypes.STRING,
        required: true
    },
    day:{
        type : DataTypes.DATE,
        required : true
    },
    startTime:{
        type : DataTypes.TIME,
        required : true
    },
    EndTime:{
        type : DataTypes.TIME,
        required : true
    },
    status:{
        type : DataTypes.INTEGER,
        default : 0
    }
});

module.exports = GroupLesson;