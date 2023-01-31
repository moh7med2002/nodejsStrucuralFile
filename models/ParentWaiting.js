const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Class = Seqalize.define('ParentWaiting' , {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    status:{
        type:DataTypes.INTEGER,
        required: true
    },
});

module.exports = Class;