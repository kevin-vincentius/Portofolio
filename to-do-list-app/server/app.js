var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors')

const authRouter = require("./routes/auth");
const taskRouter = require("./routes/tasks");

var app = express();

dotenv.config();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/tasks", taskRouter)

mongoose
.connect(process.env.MONGO_URL, {
  dbName: 'mock-test'
})
.then(() => console.log("Connected to MongoDB"))
.catch((e) => console.error(e));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.meskksage = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
