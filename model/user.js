const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  address:{
    type: String,
  },
  room:{
    type:String,
  },
  addresswork:{
    type: String,
  },
  telephone:{
    type: String,
  },
  birthday:{
    type: String,

  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
