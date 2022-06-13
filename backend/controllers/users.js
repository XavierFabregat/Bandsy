const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

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
    res.send(user);
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
    res.status(200);
    res.send(user);
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
    await user.update({
      name: req.body.name,
      // location: req.body.location,
      instruments: req.body.instruments,
      // sample: req.body.sample,
    });
    const userUpd = await Users.findOne({
      where: {
        id: req.params['id'],
      },
    });
    res.status(200);
    res.send(userUpd);
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
      res.status(200);
      res.send(otherUsers);
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
