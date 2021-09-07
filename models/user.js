const mongoose = require("mongoose");
const { DEFAULTSETTINGS: defaults } = require("../config");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  userID: String,
  username: String,
  registeredAt: { 
    type: Number, 
    default: Date.now()
  }
});

module.exports = mongoose.model("User", userSchema);