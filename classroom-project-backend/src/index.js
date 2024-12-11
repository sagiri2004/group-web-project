require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ["https://group-web-project-omega.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error("CORS error: Origin not allowed:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Cho phép gửi cookie và các thông tin xác thực khác
};

module.exports = corsOptions;
app.use(cors(corsOptions));

app.use(express.json());

connectDB();

const db = require("~/models");
const { Op } = require("sequelize");

app.post("/api/conversations", async (req, res) => {
  const { senderId, receiverId } = req.body;

  console.log("Received conversation request with:", senderId, receiverId);

  let conversation = await db.Conversation.findOne({
    where: {
      [Op.or]: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
  });

  if (!conversation) {
    console.log("Creating new conversation...");
    conversation = await db.Conversation.create({ senderId, receiverId });
  } else {
    console.log("Conversation already exists:", conversation.id);
  }

  res.status(200).json(conversation);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://group-web-project-omega.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

const jwt = require("jsonwebtoken");
io.use((socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.query.token;

  console.log("Authenticating socket:", socket.id);

  if (!token) {
    console.error(
      "Authentication failed: No token provided for socket",
      socket.id
    );
    return next(new Error("Authentication error: No token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(
        "Authentication failed: Invalid token for socket",
        socket.id
      );
      return next(new Error("Authentication error: Invalid token"));
    }

    console.log("Authentication succeeded for user:", decoded.id);
    socket.user = decoded;
    next();
  });
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_message", async (data) => {
    try {
      const senderId = socket.user.id;
      const receiverId = Number(data.receiverId); // Ensure it's a number
      const text = data.text;
      const conversationId = data.conversationId;

      console.log("Message received from user:", senderId);
      console.log("Message details:", { receiverId, text, conversationId });

      // Lưu tin nhắn vào database
      const newMessage = await db.Message.create({
        senderId,
        receiverId,
        text,
        conversationId,
      });

      console.log("Message saved to database:", newMessage.id);

      // Gửi tin nhắn đến người nhận
      socket.to(conversationId).emit("receive_message", newMessage);
      console.log("Message sent to conversation:", conversationId);

      // Gửi thông báo về cho người gửi
      newMessage.dataValues.isOwn = true;
      socket.emit("send_message_success", newMessage);
    } catch (err) {
      console.error("Error handling send_message event:", err);
      socket.emit("error", "Something went wrong");
    }
  });

  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined conversation: ${conversationId}`);
  });

  socket.on("leave_conversation", (conversationId) => {
    socket.leave(conversationId);
    console.log(`User ${socket.id} left conversation: ${conversationId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

routes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
