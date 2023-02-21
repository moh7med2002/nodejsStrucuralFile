const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const PrivateSchool = Seqalize.define('PrivateSchool' , {
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
});

module.exports = PrivateSchool;