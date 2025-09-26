const express = require("express");
const router = express.Router();
const { registerUser, recordWin, recordLoss, getUser } = require("../controllers/user.controller");

router.post("/register", registerUser);
router.post("/recordWin", recordWin);
router.post("/recordLoss", recordLoss);
router.get("/:wallet", getUser);

module.exports = router;
