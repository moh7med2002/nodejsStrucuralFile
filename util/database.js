const Sequelize = require('sequelize')
const localDbUrl ='postgres://sbayan:123456@localhost:5432/school_db'



// local db
// const sequelize = new Sequelize('school_db','root','059283805928388',{dialect:'mysql',host:"localhost"});
const sequelize = new Sequelize(localDbUrl,{dialect:'postgres',host:"localhost"});

//  academic db
// const sequelize = new Sequelize('academ58_schools_db','academ58_root','059283805928388',{dialect:'mysql',host:"localhost"});



module.exports = sequelize;
