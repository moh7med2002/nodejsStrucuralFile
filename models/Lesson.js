const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Lesson = Seqalize.define('Lesson' , {
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
    content:{
        type:DataTypes.STRING,
        required: true
    },
    videoUrl:{
        type:DataTypes.STRING,
        required: true
    },
    status:{
        type : DataTypes.INTEGER,
        required : true,
        defaultValue:0
    }
});

module.exports = Lesson;