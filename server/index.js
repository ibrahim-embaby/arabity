const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const app = express();
require("dotenv").config();

const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const { configI18n } = require("./config/i18n");
const cookieParser = require("cookie-parser");

const { notFound, errorHandler } = require("./middlewares/error");
const allowedOrigins = require("./utils/allowedOrigins");
require("./config/cache");

// connection to DB
connectToDb(process.env.MONGO_URI);

// i18n configuration
configI18n();

// middlewares
app.use(express.json());
app.use(cookieParser());

// Security Headers (helmet)
app.use(helmet());

// Cors
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// i18n
app.use(i18nextMiddleware.handle(i18next));

// Routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/search", require("./routes/searchRoute"));
app.use("/api/mechanic", require("./routes/mechanicRoute"));
app.use("/api/ratings", require("./routes/rateRoute"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/conversations", require("./routes/conversationRoute"));
app.use("/api/controls", require("./routes/controlsRoute"));
app.use("/api/comments", require("./routes/commentRoute"));

app.use(notFound);
app.use(errorHandler);

PORT = process.env.PORT || 8000;
const server = app.listen(PORT, console.log(`server is running on ${PORT}`));

// ============= socket.io ==============

const io = require("socket.io")(server, {
  cors: {
    origin: allowedOrigins,
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("🚀 Someone connected!", socket.id);
  // console.log(users);

  // get userId and socketId from client
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // get and send message
  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    const user = getUser(receiverId);

    io.to(user?.socketId).emit("getMessage", {
      senderId,
      content,
    });
  });

  // user disconnected
  socket.on("disconnect", () => {
    console.log("⚠️ Someone disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
    // console.log(users);
  });
});

io.on("error", (err) => {
  // Do something when an error occurs.
  if (err.code === "net::ERR_CONNECTION_REFUSED") {
    // The network is down. Close the connection.
    socket.disconnect();
  }
});
