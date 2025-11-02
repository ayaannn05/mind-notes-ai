const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const globalErrorHandler = require("./middleware/globalErrorController");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require('./config/passport');
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const noteRouter = require('./routes/noteRoute');
const chatRouter = require('./routes/chatRoute');
const path = require('path');
app.use(cors({origin: 'http://localhost:5173',credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(compression());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}

// Passport configuration
passportConfig(passport);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/notes', noteRouter);
app.use('/api/v1/chat', chatRouter);
app.use(globalErrorHandler);
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});
  
module.exports = app;
