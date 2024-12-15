import { io } from "socket.io-client";

// lay token tu local storage
const token = localStorage.getItem("token");

// Kết nối đến server Socket.IO
const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  query: {
    token: token,
  },
});
// Xuất instance socket để sử dụng ở các file khác
export default socket;
