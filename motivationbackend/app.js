const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-errors");
const postsRoutes = require("./routes/posts-routes");
const commentsRoutes = require("./routes/comments-routes");
const usersRoutes = require("./routes/users-routes");
const adminRoutes = require("./routes/adminpage");

const app = express();
app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  const error = new HttpError("could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    }); // delete image
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

mongoose
  .connect(
    // mongodb+srv://mhmd123:<password>@cluster0.93grh.mongodb.net/<dbname>?retryWrites=true&w=majority
    "mongodb+srv://mhmd123:mhmd123@cluster0.93grh.mongodb.net/Momh?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB Connected..");
    app.listen(5000);
  })
  .catch((err) => console.log(err));
