const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

exports.createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let body = {
      id: uuidv4(),
      email: req.body.email,
      name: req.body.name,
      password: hashPassword,
    };
    const user = await Users.create(body);
    res.status(201);
    res.send('User created successfully!');
  } catch (error) {
    console.log('Internal server error: ', error);
    res.status(500);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params['id'],
      },
    });
    const userToReturn = {
      name: user.name,
      id: user.id,
      jamgroups: user.jamgroups,
      email: user.email,
      instruments: user.instruments,
      location: user.location,
      sample: user.sample,
    };
    res.status(200);
    res.send(userToReturn);
  } catch (error) {
    console.log('Internal server error: ', error);
    res.status(500);
  }
};

exports.editUserById = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params['id'],
      },
    });
    if (!user) {
      console.log('User not found');
      res.status(400);
      res.send({ errorMessage: 'User not found!' });
    }
    await user.update({
      name: req.body.name,
      // location: req.body.location,
      instruments: req.body.instruments,
      sample: req.body.sample,
    });
    fs.writeFile(
      path.normalize(__dirname + `/../samples/${user.id}.sample.m4a`),
      JSON.stringify(req.body.sample),
      error => {
        if (error) {
          console.log(error);
        } else {
          console.log('File written successfully!');
        }
      },
    );
    const userUpd = await Users.findOne({
      where: {
        id: req.params['id'],
      },
    });
    const userToReturn = {
      name: userUpd.name,
      id: userUpd.id,
      jamgroups: userUpd.jamgroups,
      email: userUpd.email,
      instruments: userUpd.instruments,
      location: userUpd.location,
      sample: userUpd.sample,
    };
    res.status(200);
    res.send(userToReturn);
  } catch (error) {
    console.log('Internal server error: ', error);
    res.status(500);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log('wrong email');
      res.status(400);
      res.send({ error, message: 'Wrong email and/or password.' });
    } else {
      const doesPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (!doesPasswordMatch) {
        console.log('wrong password');
        res.status(400);
        res.send({ error, message: 'Wrong email and/or password.' });
      } else {
        req.session.uid = user.id;
        res.status(200);
        res.send({ id: user.id });
      }
    }
  } catch (error) {
    console.log('Internal server error: ', error);
    res.status(500);
  }
};

exports.getOtherUsers = async (req, res) => {
  try {
    const otherUsers = await Users.findAll({
      where: { id: { [Op.ne]: req.params['id'] } },
    });
    if (!otherUsers) {
      res.status(400);
      res.send({ error, message: "Haven't found other users." });
    } else {
      const otherUsersToReturn = [];
      for (let i = 0; i < otherUsers.length; i++) {
        otherUsersToReturn[i] = {
          name: otherUsers[i].name,
          id: otherUsers[i].id,
          jamgroups: otherUsers[i].jamgroups,
          email: otherUsers[i].email,
          instruments: otherUsers[i].instruments,
          location: otherUsers[i].location,
          sample: otherUsers[i].sample,
        };
      }
      res.status(200);
      res.send(otherUsersToReturn);
    }
  } catch (error) {
    console.log('Internal server error: ', error);
    res.status(500);
  }
};

exports.logout = async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res
        .status(500)
        .send({ error, message: 'Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      res.status(200).send({ message: 'Logout successful' });
    }
  });
};
