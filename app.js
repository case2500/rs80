const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const config = require('./config/index'); 

dotenv.config();
let PORT=process.env.PORT || 5000;

// Connect DB

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.use("/user", require("./routes/user"));
app.use("/userball", require("./routes/userball"));
app.use("/userpay", require("./routes/userpay"));
// app.use("/filter", require("./routes/user"));
app.listen(process.env.PORT || 5000, () => console.log("Server is running"+process.env.PORT+process.env.CLOUDINARY_API_SECRET));
