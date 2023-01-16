const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const PsychoStudent = Seqalize.define('Psycho_Student' , {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    description:{
        type:DataTypes.TEXT,
        required: true
    },
    startTime:{
        type : DataTypes.TIME,
    },
    status:{
        type : DataTypes.INTEGER,
        defaultValue : 0
    }
});

module.exports = PsychoStudent;