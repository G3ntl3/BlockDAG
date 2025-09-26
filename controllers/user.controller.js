const User = require("../models/user_model");

// Register or update user
// POST /user/register
const registerUser = async (req, res) => {
  try {
    const { wallet, username, avatar } = req.body;

    if (!wallet) {
      return res.status(400).json({ message: "Wallet is required" });
    }

    let user = await User.findOne({ wallet });

    if (user) {
      // Update existing
      user.username = username || user.username;
      user.avatar = avatar || user.avatar;
      await user.save();
      return res.status(200).json({ message: "User updated", user });
    }

    // Create new
    user = new User({
      wallet,
      username,
      avatar,
      totalBets: 0,
      wins: 0,
      losses: 0,
      netProfit: 0,
      history: [],
    });

    await user.save();
    return res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
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
