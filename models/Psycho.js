const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Post = Seqalize.define('Psycho' , {
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
    duration:{
        type:DataTypes.INTEGER,
        required: true
    },
    description:{
        type: DataTypes.TEXT,
        required: true
    }
});

module.exports = Post;