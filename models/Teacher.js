const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Teacher = Seqalize.define('Teacher' , {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type:DataTypes.STRING,
        required: true
    },
    name:{
        type:DataTypes.STRING,
        required: true
    },
    phone:{
        type:DataTypes.STRING,
        required: true
    },
    password:{
        type:DataTypes.STRING,
        required: true
    },
    gender:{
        type:DataTypes.STRING,
        required: true
    },
    image:{
        type:DataTypes.STRING,
    },
});

module.exports = Teacher;