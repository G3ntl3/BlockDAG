const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/user.route");
const leaderboardRoutes = require("./routes/leaderboard.route");

app.use("/users", userRoutes);
app.use("/leaderboard", leaderboardRoutes);


app.get("/", (req, res) =>
  res.send("Blockdag endpoint")
);


// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
