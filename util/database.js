const Sequelize = require('sequelize')

const DEV_DATABASE_URL='postgres://school_shatha:123456@localhost:5432/school_db'



// local db
// const sequelize = new Sequelize('school_db','root','059283805928388',{dialect:'mysql',host:"localhost"});
const sequelize = new Sequelize(DEV_DATABASE_URL,{dialect:'postgres',host:"localhost"});


//  academic db
// const sequelize = new Sequelize('academ58_schools_db','academ58_root','059283805928388',{dialect:'mysql',host:"localhost"});



module.exports = sequelize;
