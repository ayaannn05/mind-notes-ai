const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();
const {
  getNotes,
  createNote,
  getNote,
  deleteNote,
  updateNote,
} = require("../controller/noteController");
const upload = require("../utils/multer");

router.use(isAuthenticated);
router.route("/").get(getNotes).post(upload.single("file"), createNote);
router.route("/:id").get(getNote).delete(deleteNote).patch(updateNote);


module.exports = router;