const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`Database is Connected successfully`);
    })
    .catch((err) => {
      console.error("Database connection error:", err.message);
    });
};
module.exports = databaseConnection;