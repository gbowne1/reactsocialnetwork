const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");

const loginUserRouter = require("./routes/users/loginUser");
const createUserRouter = require("./routes/users/createUser");

const getUsersRouter = require("./routes/users/getUsers");
const getUserRouter = require("./routes/users/getUser");

const updateUserRouter = require("./routes/users/updateUser");
const deleteUserRouter = require("./routes/users/deleteUser");

// Warning!
const deleteUsersRouter = require("./routes/users/deleteUsers");
const deleteTestUsersRouter = require("./routes/users/deleteTestUsers");

const getUserFriends = require("./routes/friend-requests/getUserFriends");
const getFriendRequestsReceived = require("./routes/friend-requests/getFriendRequestsReceived");
const getFriendRequestsSent = require("./routes/friend-requests/getFriendRequestsSent");

const createFriendRequest = require("./routes/friend-requests/createFriendRequest");
const acceptFriendRequest = require("./routes/friend-requests/acceptFriendRequest");
const rejectFriendRequest = require("./routes/friend-requests/rejectFriendRequest");

// Warning!
const unfriend = require("./routes/friend-requests/unfriend");

const getPostRouter = require("./routes/posts/getPost");
const getPostsRouter = require("./routes/posts/getPosts");

const createPostRouter = require("./routes/posts/createPost");
const updatePostRouter = require("./routes/posts/updatePost");
const deletePostRouter = require("./routes/posts/deletePost");

// Warning!
const deleteTestPostsRouter = require("./routes/posts/deleteTestPosts");

const getEventsRouter = require("./routes/events/getEvents");
const getEventRouter = require("./routes/events/getEvent");

const createEventRouter = require("./routes/events/createEvent");
const updateEventRouter = require("./routes/events/updateEvent");
const deleteEventRouter = require("./routes/events/deleteEvent");

// Warning!
const deleteTestEventsRouter = require("./routes/events/deleteTestEvents");

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

app.use(createUserRouter);
// -------------------------

// USERS -------------------
app.use(getUsersRouter);

app.use(getUserRouter);

app.use(updateUserRouter);

app.use(deleteUserRouter);

// Warning!
app.use(deleteTestUsersRouter);
// -------------------------

// FRIENDS -----------------

app.use(getUserFriends);

app.use(getFriendRequestsReceived);
app.use(getFriendRequestsSent);

app.use(createFriendRequest);

app.use(acceptFriendRequest);

app.use(rejectFriendRequest);

app.use(unfriend);
// -------------------------

// POSTS -------------------

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

app.use(createEventRouter);

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
