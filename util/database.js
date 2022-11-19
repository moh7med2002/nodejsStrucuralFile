const Sequelize = require('sequelize')

// const sequelize = new Sequelize('pallwacj_school_db','pallwacj_root','059283805928388',{dialect:'mysql',host:"localhost"})

// const sequelize = new Sequelize('school_db','root','059283805928388',{dialect:'mysql',host:"localhost"});

const sequelize = new Sequelize('freedb_myschool','freedb_schooluser','TPf8*Ttzkn8mPKF',{dialect:'mysql',host:"sql.freedb.tech"});


module.exports = sequelize;
