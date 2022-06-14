const Messages = require('../models/messages');
const { v4: uuid } = require('uuid');

exports.postMessageToGroup = async (req, res) => {
  try {
    const { content, authorid, timestamp, jamgroupid } = req.body;
    const message = {
      id: uuid(),
      content,
      authorid,
      timestamp,
      jamgroupid,
    };
    console.log(message);
    const messageCreated = await Messages.create(message);
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
