const express = require("express");
const router = express.Router();
const { leaderboardEarnings, leaderboardWins, leaderboardLosses,leaderboardWinRate } = require("../controllers/leaderboard.controller");

router.get("/earnings", leaderboardEarnings);
router.get("/wins", leaderboardWins);
router.get("/losses", leaderboardLosses);
router.get("/winrate", leaderboardWinRate); 

module.exports = router;
