var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// ============================= CORS
var cors = require("cors");
var corsOptions = {
  credentials: true,
  preflightContinue: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  origin: true,
};

const session = require("express-session");
const passport = require("passport");
require("./config/passport-setup");

var indexRouter = require("./routes/index");

// ============================= DB connect
var mongoose = require("mongoose");
require("dotenv").config();
const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb, {}).catch((error) => console.error(error));

// mongo error handling
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo Connection Error:"));

var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// ============================= middleware
var compression = require("compression");
var helmet = require("helmet");
app.use(compression());
app.use(helmet.crossOriginEmbedderPolicy({ policy: "credentialless" }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

// ============================= passportJS
// app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

app.use(passport.initialize());
// app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// ========================= extra middleware ============================
// app.use(function (req, res, next) {
//   req.body.mainTitle = "Anon Blog";
//   next();
// });

// ============================= routes
app.use("/", indexRouter.indexRouter);
app.use("/auth", indexRouter.authRouter);
app.use("/users", indexRouter.userRouter);
app.use("/posts", indexRouter.postRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
