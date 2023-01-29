const {DataTypes} = require('sequelize')
const Seqalize = require('../util/database');

const Wallet = Seqalize.define('Wallet' , {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    image:{
        type:DataTypes.STRING,
        required: true
    },
    money:{
        type:DataTypes.DOUBLE,
        required: true
    },
    status:{
        type: DataTypes.INTEGER,
        required : true
    }
});

module.exports = Wallet;