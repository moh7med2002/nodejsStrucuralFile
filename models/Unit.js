const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Unit = Seqalize.define('Unit' , {
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

module.exports = Unit;