require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const routesToNotes = require("./routes/routes");

app.use(express.json());

app.use((req, res, next) => {
  cors({ origin: req.headers.origin });
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  console.log(req.path, req.method);
  next();
});

app.use("/api/", routesToNotes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log("Up and running on port 4000");
    });
  })
  .catch((err) => console.log(err));
