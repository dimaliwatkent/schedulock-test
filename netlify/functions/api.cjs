const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const scheduleRouter = require("./routes/schedule.cjs");
const roomRouter = require("./routes/room.cjs");

const app = express();
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(cookieParser());

mongoose
  .connect(`${process.env.VITE_MONGODB_API_KEY}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

app.use("/.netlify/functions/api/room", roomRouter);
app.use("/.netlify/functions/api/schedule", scheduleRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports.handler = serverless(app);
