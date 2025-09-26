const User = require("../models/user_model");

// Register or update user
const registerUser = async (req, res) => {
  try {
    const { wallet, username } = req.body;

    if (!wallet || !username) {
      return res.status(400).json({ error: "Wallet and username required" });
    }

    let user = await User.findOne({ wallet });

    if (user) {
      user.username = username;
      await user.save();
    } else {
      user = await User.create({ wallet, username });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Record a win
const recordWin = async (req, res) => {
  try {
    const { wallet, amountWon } = req.body;

    let user = await User.findOne({ wallet });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.wins += 1;
    user.earnings += Number(amountWon) || 0;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Record a loss
const recordLoss = async (req, res) => {
  try {
    const { wallet } = req.body;

    let user = await User.findOne({ wallet });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.losses += 1;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one user stats
const getUser = async (req, res) => {
  try {
    const { wallet } = req.params;
    const user = await User.findOne({ wallet });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, recordWin, recordLoss, getUser };
