const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Parent = Seqalize.define('Parent' , {
    email:{
        type:DataTypes.STRING,
        required: true
    },
    password:{
        type:DataTypes.STRING,
        required: true
    },
    name:{
        type:DataTypes.STRING,
        required: true
    }
});

module.exports = Parent;