const { getOne } = require("./handleFactory");
const User = require("../model/userModel");

exports.getUser = getOne(User);