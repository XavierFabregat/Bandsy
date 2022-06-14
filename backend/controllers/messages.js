const Messages = require('../models/messages');
const { v4: uuid } = require('uuid');
const Users = require('../models/Users');

exports.postMessageToGroup = async (req, res) => {
  try {
    const { content, userId, timestamp, jamgroupid } = req.body;
    const message = {
      id: uuid(),
      content,
      userId,
      timestamp,
      jamgroupid,
    };
    const messageCreated = await Messages.create(message);
    messageCreated.dataValues.user = await Users.findOne({
      where: { id: userId },
    });
    res.status(201);
    res.send(messageCreated);
  } catch (error) {
    console.log('Internal server error: ', error);
    res.status(500);
  }
};

exports.getGroupMessagesById = async (req, res) => {
  try {
    const messagesOfGroup = await Messages.findAll({
      where: { jamgroupid: req.params.id },
      order: [['timestamp', 'ASC']],
    });
    if (messagesOfGroup) {
      for (let i = 0; i < messagesOfGroup.length; i++) {
        const userData = await Users.findOne({
          where: { id: messagesOfGroup[i].userId },
        });
        let userToReturn = {
          name: userData.dataValues.name,
          id: userData.dataValues.id,
          jamgroups: userData.dataValues.jamgroups,
          email: userData.dataValues.email,
          instruments: userData.dataValues.instruments,
          location: userData.dataValues.location,
          sample: userData.dataValues.sample,
        };
        messagesOfGroup[i].dataValues.user = userToReturn;
      }
      res.status(200);
      res.send(messagesOfGroup);
    } else {
      res.status(404);
      res.send({ Message: 'No messages found!' });
    }
  } catch (error) {
    console.log('Internal server error: ', error);
    res.status(500);
  }
};
