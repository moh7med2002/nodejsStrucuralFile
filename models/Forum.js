const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Forum = Seqalize.define('Forum' , {
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
});

module.exports = Forum;