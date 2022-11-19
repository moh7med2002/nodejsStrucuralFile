const Sequelize = require('sequelize')

// const sequelize = new Sequelize('pallwacj_school_db','pallwacj_root','059283805928388',{dialect:'mysql',host:"localhost"})

// const sequelize = new Sequelize('school_db','root','059283805928388',{dialect:'mysql',host:"localhost"});

const sequelize = new Sequelize('freedb_school_db','freedb_school_user','Y?Y%GRaW4XFthp9',{dialect:'mysql',host:"sql.freedb.tech"});


module.exports = sequelize;
