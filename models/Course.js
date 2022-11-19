const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Course = Seqalize.define('Course' , {
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
    image:{
        type:DataTypes.STRING,
        required: true
    },
    price:{
        type:DataTypes.INTEGER,
        required: true
    },
    goals:{
        type:DataTypes.INTEGER,
        required: true
    },
});

module.exports = Course;