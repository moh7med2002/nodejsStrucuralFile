const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Grade = Seqalize.define('Grade' , {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    grade:{
        type:DataTypes.INTEGER,
        required: true
    },
});

module.exports = Grade;