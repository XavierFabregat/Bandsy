const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const JamGroup = require('./JamGroups');
const Users = require('./Users');

const Messages = sequelize.define(
  'messages',
  {
    jamgroupid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Messages;
