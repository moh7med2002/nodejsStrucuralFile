const Sequelize = require('sequelize')

// const sequelize = new Sequelize('rescteeh_schools_db','rescteeh_root_user','059283805928388',{dialect:'mysql',host:"localhost"})

// const sequelize = new Sequelize('school_db','root','059283805928388',{dialect:'mysql',host:"localhost"});


const sequelize = new Sequelize('academ58_schools_db','academ58_root','059283805928388',{dialect:'mysql',host:"localhost"})



module.exports = sequelize;
