require("dotenv").config();
const express = require("express");
const http = require("http"); // Thêm http module
const { Server } = require("socket.io"); // Thêm socket.io
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Thêm logic cho Socket.IO
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(express.json());
app.use("/api", authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
