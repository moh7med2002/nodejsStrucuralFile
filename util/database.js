const Sequelize = require('sequelize')




// local db
// const sequelize = new Sequelize('school_db','root','059283805928388',{dialect:'mysql',host:"localhost"});


//  academic db
const sequelize = new Sequelize('academ58_schools_db','academ58_root','059283805928388',{dialect:'mysql',host:"localhost"});



module.exports = sequelize;
