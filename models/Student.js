const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Student = Seqalize.define('Student' , {
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
    password:{
        type:DataTypes.STRING,
        required: true
    },
    gender:{
        type:DataTypes.STRING,
        required: true
    },
    money:{
        type:DataTypes.INTEGER,
        default: 0
    },
    image:{
        type :DataTypes.STRING,
        default :""
    }
});

module.exports = Student;