const { DataTypes } = require("sequelize");
const Seqalize = require("../util/database");

const StudentMembership = Seqalize.define("Student_Membership", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  start_date: {
    type: DataTypes.DATE,
    required: true,
  },
  end_date: {
    type: DataTypes.DATE,
    required: true,
  },
});

module.exports = StudentMembership;
