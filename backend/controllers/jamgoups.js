const { v4: uuidv4 } = require('uuid');
const JamGroups = require('../models/JamGroups');
const { Op } = require('sequelize');

exports.createJamGroup = async (req, res) => {
  try {
    const { name, admin } = req.body;
    if (name && admin) {
      const jamGroup = {
        id: uuidv4(),
        name,
        admin,
        users: [admin],
      };
      const newJamGroup = await JamGroups.create(jamGroup);
      res.status(201);
      res.send(newJamGroup);
    } else {
      if (!admin && name) {
        res.status(400);
        res.send({ error, message: 'Admin must be specified!' });
      } else if (!name && admin) {
        res.status(400);
        res.send({ error, message: 'Name must be specified!' });
      } else {
        res.status(400);
        res.send({ error, message: 'Name and Admin must be specified!' });
      }
    }
  } catch (error) {
    console.log('Internal server error: ', error);
    res.status(500);
  }
};

exports.getJamGroupsUserBelongsTo = async (req, res) => {
  try {
    const allJamGroups = await JamGroups.findAll({});
    const jamGroups = allJamGroups.filter(group =>
      group.users.includes(req.params['id']),
    );
    if (!jamGroups) {
      res.status(404);
      res.send({ error, message: "User doesn't belong to any Jam Group" });
    } else {
      res.status(200);
      res.send(jamGroups);
    }
  } catch (error) {
    console.log('Internal server error: ', error);
    res.status(500);
  }
};

exports.addOtherUserToMyJamGroup = async (req, res) => {
  console.log(req.body);
  try {
    const jamGroup = await JamGroups.findOne({
      where: { id: req.params['id'] },
    });
    if (!jamGroup) {
      res.status(404);
      res.send('Jam Group not found.');
    } else {
      const users = jamGroup.users;
      const newUsers = [...users, req.body.id];
      await jamGroup.update({
        users: newUsers,
      });
      const jamGroupUpdated = await JamGroups.findOne({
        where: { id: req.params['id'] },
      });
      res.status(200);
      res.send(jamGroupUpdated);
    }
  } catch (error) {
    console.log('Internal server error: ', error);
    res.status(500);
  }
};

exports.getJamGroupsOfWhichIAmAdmin = async (req, res) => {
  try {
    const jamGroups = await JamGroups.findAll({
      where: { admin: req.params['id'] },
    });
    if (!jamGroups) {
      res.status(404);
      res.send({ error, message: 'User is not admin of any JamGroup!' });
    } else {
      res.status(200);
      res.send(jamGroups);
    }
  } catch (error) {
    console.log('Internal server error: ', error);
    res.status(500);
  }
};
