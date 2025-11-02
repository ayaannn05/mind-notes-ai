const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const { getUser } = require("../controller/userController");
const { getMe } = require("../controller/authController");

router.use(isAuthenticated);
router.get('/me', getMe , getUser);

module.exports = router;