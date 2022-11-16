const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Subject = Seqalize.define('Subject' , {
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

module.exports = Subject;