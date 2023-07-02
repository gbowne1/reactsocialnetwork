const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");

const loginUserRouter = require("./routes/loginUser");
const registerUserRouter = require("./routes/registerUser");

const getUsersRouter = require("./routes/getUsers");
const getUserRouter = require("./routes/getUser");

const updateUserRouter = require("./routes/updateUser");
const deleteUserRouter = require("./routes/deleteUser");
// Warning!
const deleteUsersRouter = require("./routes/deleteUsers");
const deleteTestUsersRouter = require("./routes/deleteTestUsers");

const getPostRouter = require("./routes/getPost");
const getPostsRouter = require("./routes/getPosts");

const createPostRouter = require("./routes/createPost");
const updatePostRouter = require("./routes/updatePost");
const deletePostRouter = require("./routes/deletePost");

// Warning!
const deleteTestPostsRouter = require("./routes/deleteTestPosts");

const getEventsRouter = require("./routes/getEvents");
const getEventRouter = require("./routes/getEvent");
const registerEventRouter = require("./routes/registerEvent");
const updateEventRouter = require("./routes/updateEvent");
const deleteEventRouter = require("./routes/deleteEvent");

// Warning!
const deleteTestEventsRouter = require("./routes/deleteTestEvents");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// AUTHENTICATION ----------
app.use(loginUserRouter);

app.use(registerUserRouter);
// -------------------------

// USERS -------------------
app.use(getUsersRouter);

app.use(getUserRouter);

app.use(updateUserRouter);

app.use(deleteUserRouter);

// Warning!
app.use(deleteTestUsersRouter);
// -------------------------

// POSTS ------------------

app.use(getPostsRouter);

app.use(getPostRouter);

app.use(createPostRouter);

app.use(updatePostRouter);

app.use(deletePostRouter);

// Warning!
app.use(deleteTestPostsRouter);

// -------------------------

// EVENTS ------------------

app.use(getEventsRouter);

app.use(getEventRouter);

app.use(registerEventRouter);

app.use(updateEventRouter);

app.use(deleteEventRouter);

// Warning!
app.use(deleteTestEventsRouter);

// -------------------------

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
  res.render("error");
});

module.exports = app;
