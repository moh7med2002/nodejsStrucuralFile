const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Class = Seqalize.define('Class' , {
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

module.exports = Class;