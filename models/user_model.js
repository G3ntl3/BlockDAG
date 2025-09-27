const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  wallet: { type: String, unique: true, required: true },
  username: { type: String, required: true , unique:true },
 avatar: { type: String },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  history: [
    
    {
      "betId": { type: Number, default: 0 },
      "marketId":{ type: String, required: true }  ,
      "bet": { type: String, required: true },
      "amount": { type: Number, default: 0 },
      "status": { type: String, required: true },
      "payout": { type: Number, default: 0 }
    }
  ]

});

module.exports = mongoose.model("Players", userSchema);
