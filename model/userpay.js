const mongoose = require("mongoose");
const userpaySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  datepay:{
    type: Date, default: Date.now
  },
  price:{
    type:String, default: 100
  },
  cloudinary_id: {
    type: String,
  },
  status:{
    type: String, default: 0
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("Userpay", userpaySchema);
