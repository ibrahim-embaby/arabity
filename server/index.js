const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const app = express();
require("dotenv").config();

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const searchRoute = require("./routes/searchRoute");
const workshopOwnerRoute = require("./routes/workshopOwnerRoute");
const rateRoute = require("./routes/rateRoute");
const messagesRoute = require("./routes/messageRoutes");
const conversationsRoute = require("./routes/conversationRoute");

// connection to DB
connectToDb();

// middlewares
app.use(express.json());

// Security Headers (helmet)
app.use(helmet());

// Cors
app.use(cors());

// Routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/search", searchRoute);
app.use("/api/workshop-owner", workshopOwnerRoute);
app.use("/api/ratings", rateRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/conversations", conversationsRoute);

PORT = process.env.PORT || 8000;
app.listen(process.env.PORT, console.log(`server is running on ${PORT}`));
