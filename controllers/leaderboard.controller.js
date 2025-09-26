const User = require("../models/user_model");

// Earnings leaderboard
const leaderboardEarnings = async (req, res) => {
  try {
    const users = await User.find().sort({ earnings: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Wins leaderboard
const leaderboardWins = async (req, res) => {
  try {
    const users = await User.find().sort({ wins: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Losses leaderboard
const leaderboardLosses = async (req, res) => {
  try {
    const users = await User.find().sort({ losses: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { leaderboardEarnings, leaderboardWins, leaderboardLosses };
