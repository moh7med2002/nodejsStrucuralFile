const { DataTypes } = require("sequelize");
const Seqalize = require("../util/database");

const ForumStudent = Seqalize.define("Forum_Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = ForumStudent;
