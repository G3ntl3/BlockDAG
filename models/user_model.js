const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  wallet: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", userSchema);
