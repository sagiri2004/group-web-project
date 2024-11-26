import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiSend, FiSearch } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import socket from "~/api/socketConfig";
import apiClient from "~/api/apiClient";
import { calculateTimeSince } from "~/utils/timeUtils";

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: "#f0f2f5",
  height: theme.custom.mainContentHeight,
}));

const ContactsSection = styled(Paper)(({ theme }) => ({
  width: 350,
  overflow: "hidden",
  transition: "width 0.3s ease",
  borderRadius: 0,
}));

const ChatSection = styled(Paper)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  borderRadius: 0,
}));

const MessageContainer = styled(Box)({
  flex: 1,
  padding: "20px",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isOwn",
})(({ theme, isOwn }) => ({
  display: "flex",
  justifyContent: isOwn ? "flex-end" : "flex-start",
  marginBottom: "10px",
}));

const Message = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isOwn",
})(({ theme, isOwn }) => ({
  padding: "10px 15px",
  maxWidth: "70%",
  borderRadius: "18px",
  backgroundColor: isOwn ? "#0084ff" : "#e4e6eb",
  color: isOwn ? "#fff" : "#050505",
}));

const InputSection = styled(Box)({
  padding: "20px",
  borderTop: "1px solid rgba(0, 0, 0, 0.12)",
});

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const theme = useTheme();

  const [contacts, setContacts] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messageEndRef = useRef(null);
  const [receiverId, setReceiverId] = useState(
    useParams().receiverId || contacts[0]?.id
  );
  // lay ra user tu redux
  const user = useSelector((state) => state.auth.login.currentUser);
  const senderId = user.id;

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [currentConversation, setCurrentConversation] = useState(null);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await apiClient.get("/messages");
        let user = [];
        // tach user ra khoi conversation
        data.forEach((conversation) => {});

        setContacts(data);
      } catch (error) {
        console.error("Error getting conversations:", error);
      }
    };

    getConversations();
  }, []);

  useEffect(() => {
    const createOrGetConversation = async () => {
      try {
        const { data } = await apiClient.post(`/conversations`, {
          senderId,
          receiverId,
        });
        setCurrentConversation(data);
        console.log("Conversation created:", data);

        // Join conversation room
        socket.emit("join_conversation", data.id);
      } catch (error) {
        console.error("Error creating conversation:", error);
      }
    };

    // get messages
    const getMessages = async () => {
      try {
        const { data } = await apiClient.get(`/messages/${receiverId}`);
        // them truong isOwn de phan biet tin nhan cua minh va nguoi khac
        data.forEach((message) => {
          message.isOwn = message.senderId === senderId;
        });
        console.log("Messages:", data);
        setMessages(data);
      } catch (error) {
        console.error("Error getting messages:", error);
      }
    };

    createOrGetConversation();
    getMessages();
  }, [receiverId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      conversationId: currentConversation.id,
      senderId,
      receiverId,
      text: newMessage,
    };

    socket.emit("send_message", messageData);
    messageData.isOwn = true;
    messageData.timestamp = new Date().toISOString();
    messageData.id = Math.floor(Math.random() * 1000000);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage("");
  };

  // khi chuyen cuoc tro chuyen khac
  const handleSwitchConversation = (conversationId) => {
    setCurrentConversation(conversationId);
    socket.emit("leave_conversation", conversationId);

    // chuyen sang cuoc tro chuyen khac bang cach thay doi receiverId
    setReceiverId(conversationId);
  };

  useEffect(() => {
    // Lắng nghe sự kiện nhận tin nhắn
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("send_message_success", (newMessage) => {
      console.log("Message sent successfully:", newMessage);
    });

    socket.on("error", (errorMessage) => {
      console.error("Error:", errorMessage);
    });

    socket.on("join_conversation", (conversationId) => {
      console.log(`User joined conversation: ${conversationId}`);
    });

    socket.on("leave_conversation", (conversationId) => {
      console.log(`User left conversation: ${conversationId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    return () => {
      socket.off("receive_message");
      socket.off("send_message_success");
      socket.off("error");
      socket.off("join_conversation");
      socket.off("leave_conversation");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <ChatContainer>
        <ContactsSection>
          <Box p={2}>
            <TextField
              fullWidth
              placeholder="Search contacts"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <List>
            {contacts.map((contact) => (
              <ListItem
                key={contact.id}
                onClick={() => handleSwitchConversation(contact.id)}
                button
                sx={{
                  "&:hover": {
                    backgroundColor:
                      contact.id === Number(receiverId)
                        ? theme.palette.primary.dark // Màu hover cho mục được chọn
                        : theme.palette.action.hover, // Màu hover mặc định cho mục khác
                  },
                  backgroundColor:
                    contact.id === Number(receiverId)
                      ? theme.palette.primary.main
                      : "inherit",
                  color:
                    contact.id === Number(receiverId)
                      ? theme.palette.primary.contrastText
                      : "inherit",
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  >
                    <Avatar src={contact.avatar} alt={contact.name} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText primary={contact.name} />
              </ListItem>
            ))}
          </List>
        </ContactsSection>

        <ChatSection>
          <Box
            p={2}
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Chat</Typography>
          </Box>

          <MessageContainer>
            {messages.map((message) => (
              <MessageBubble key={message.id} isOwn={message.isOwn}>
                <Message isOwn={message.isOwn}>
                  <Typography>{message.text}</Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 0.5, opacity: 0.7 }}
                  >
                    {calculateTimeSince(message.timestamp)}
                  </Typography>
                </Message>
              </MessageBubble>
            ))}
            <div ref={messageEndRef} />
          </MessageContainer>

          <InputSection>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Add emoji">
                      <IconButton size="small">
                        <BsEmojiSmile />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Attach file">
                      <IconButton size="small">
                        <RiAttachment2 />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send message">
                      <IconButton
                        onClick={handleSendMessage}
                        size="small"
                        color="primary"
                      >
                        <FiSend />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </InputSection>
        </ChatSection>
      </ChatContainer>
    </div>
  );
};

export default ChatApp;
