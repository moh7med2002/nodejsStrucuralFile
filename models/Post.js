const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Post = Seqalize.define('Post' , {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    content:{
        type:DataTypes.TEXT,
        required: true
    },
});

module.exports = Post;