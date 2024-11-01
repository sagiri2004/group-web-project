require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
