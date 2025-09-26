const express = require("express");
const router = express.Router();
const { leaderboardEarnings, leaderboardWins, leaderboardLosses } = require("../controllers/leaderboard.controller");

router.get("/earnings", leaderboardEarnings);
router.get("/wins", leaderboardWins);
router.get("/losses", leaderboardLosses);

module.exports = router;
