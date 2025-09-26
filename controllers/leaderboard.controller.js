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

const leaderboardWinRate = async (req, res) => {
  try {
    const users = await User.find().select("wallet username avatar wins losses earnings");

    // Calculate win rate for each user
    const withRates = users.map((u) => {
      const totalBets = u.wins + u.losses;
      const winRate = totalBets > 0 ? (u.wins / totalBets) * 100 : 0;
      return { ...u.toObject(), winRate: winRate.toFixed(2) };
    });

    // Sort by winRate (descending)
    const sorted = withRates.sort((a, b) => b.winRate - a.winRate).slice(0, 20);

    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { leaderboardEarnings, leaderboardWins, leaderboardLosses, leaderboardWinRate };
