const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Notifications = Seqalize.define('Notifications' , {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        required:true
    },
    link:{
        type:DataTypes.STRING,
    },
    seen:{
        type : DataTypes.BOOLEAN,
        required : true
    }
});

module.exports = Notifications;