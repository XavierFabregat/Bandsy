const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Users = require('./Users');

const JamGroups = sequelize.define(
  'jamgroups',
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    admin: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    users: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = JamGroups;
