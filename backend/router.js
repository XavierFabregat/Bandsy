const router = require('express').Router();
const userController = require('./controllers/users');
const jamGroupController = require('./controllers/jamgoups');
const messagesController = require('./controllers/messages');
const authMiddleware = require('./middleware/auth');

router.post('/user', userController.createUser);
router.post('/login', userController.login);
router.get('/user/:id', authMiddleware, userController.getUserById);
router.put('/user/:id', authMiddleware, userController.editUserById);
router.post('/logout', authMiddleware, userController.logout);
router.get('/users/:id', authMiddleware, userController.getOtherUsers);
router.post('/jamgroup', authMiddleware, jamGroupController.createJamGroup);
router.get(
  '/jamgroup/:id',
  authMiddleware,
  jamGroupController.getJamGroupsUserBelongsTo,
);
router.put(
  '/jamgroup/:id',
  authMiddleware,
  jamGroupController.addOtherUserToMyJamGroup,
);
router.get(
  '/jamgroup/admin/:id',
  authMiddleware,
  jamGroupController.getJamGroupsOfWhichIAmAdmin,
);
router.post('/messages', authMiddleware, messagesController.postMessageToGroup);
router.get(
  '/messages/:id',
  authMiddleware,
  messagesController.getGroupMessagesById,
);
module.exports = router;
