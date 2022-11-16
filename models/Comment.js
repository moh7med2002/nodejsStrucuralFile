const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Comment = Seqalize.define('Comment' , {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    text:{
        type:DataTypes.TEXT,
        required: true
    },
});

module.exports = Comment;