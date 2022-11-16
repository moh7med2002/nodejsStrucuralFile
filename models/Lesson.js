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
});

module.exports = Lesson;