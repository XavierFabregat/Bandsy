const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Users = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    jamgroups: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      default: [],
    },
    instruments: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      default: [],
    },
    location: {
      type: DataTypes.GEOMETRY('POINT', 4326),
    },
    sample: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Users;
