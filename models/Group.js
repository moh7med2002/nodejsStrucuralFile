const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Group = Seqalize.define('Groupe' , {
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
        type:DataTypes.DOUBLE,
        required: true
    },
    goals:{
        type:DataTypes.TEXT,
        required: true
    },
    description:{
        type:DataTypes.TEXT,
        required: true
    },
    allowedStudents:{
        type : DataTypes.INTEGER,
        required : true
    },
    registerStudents:{
        type : DataTypes.INTEGER,
        defaultValue : 0
    }
});

module.exports = Group;