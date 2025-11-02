const express = require("express");
const router = express.Router();
const userRouter = require("./userRoute");
router.use('/users', userRouter);
router.use('/products');

module.exports = router;
