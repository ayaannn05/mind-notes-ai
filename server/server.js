const databaseConnection = require("./config/database");
// process.on("uncaughtException", (err) => {
//     console.log("UNCAUGHT EXCEPTION !! server closing down");
//     console.log(err.name);
//     console.log(`ERROR : ${err.message}`);
//     process.exit(1);
//   });

require("dotenv").config({path: "./.env"});
const app = require("./app");



const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
databaseConnection();



// process.on("unhandledRejection", (err) => {
//     console.log("UNHANDLED REJECTION !! server closing down");
//     console.log(err.name);
//     console.log(`ERROR : ${err.message}`);
//     server.close(() => {
//         process.exit(1);
//     });
// });