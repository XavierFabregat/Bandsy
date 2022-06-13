const User = require('../models/Users');
const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.session.uid, 'auth session uid');
    if (!req.session.uid) {
      return res.status(401).send('Unathorized route please login.');
    }
    const user = await User.findOne({ id: req.session.uid });
    if (!user) {
      return res.status(401).send('Unauthorized route please login!');
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = authMiddleware;
