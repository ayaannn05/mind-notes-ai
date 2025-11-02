const express = require('express');
const router = express.Router();
const { generateChat, getAllMessages, deleteChat } = require('../controller/chatController');
const { isAuthenticated } = require('../middleware/auth');
router.use(isAuthenticated)

router.route("/").post(generateChat).delete(deleteChat);
router.route("/:noteId").get(getAllMessages);

module.exports = router;
