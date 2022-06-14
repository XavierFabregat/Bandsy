const { DataTypes } = require('sequelize');
const sequelize = require('./index');

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
    authorid: {
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
