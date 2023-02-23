const { DataTypes } = require("sequelize");
const Seqalize = require("../util/database");

const PrivateSchool = Seqalize.define("PrivateSchool", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
  course: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: false,
  },
  exam: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: false,
  },
  forum: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: false,
  },
  group: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: false,
  },
  lesson: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: false,
  },
  psycho: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: false,
  },
  subject: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: false,
  },
  unit: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: false,
  },
});

module.exports = PrivateSchool;
