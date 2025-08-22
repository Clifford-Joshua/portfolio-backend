require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cors = require("cors");
const fileUpload = require("express-fileupload");

const adminRouter = require("./router/adminRouter");
const projectRouter = require("./router/projectRoutes");
const contactRouter = require("./router/contactRoute");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const connectDB = require("./db/connect");

app.use(express.json());

app.use(cors());

app.use(fileUpload());

app.use(express.static("./public"));

app.use("/admin", adminRouter);

app.use("/api/v1/projects", projectRouter);

app.use("/contact", contactRouter);

app.get("/", (req, res) => {
  res.send("portfolio project start up");
});

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);

    app.listen(port, (req, res) => {
      console.log(`app is listening to port ${port}..............`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
