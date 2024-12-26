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
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiSend, FiSearch } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import socket from "~/api/socketConfig";
import apiClient from "~/api/apiClient";
import { calculateTimeSince } from "~/utils/timeUtils";

import SearchContacts from "./SearchContacts";

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

const MessageBubble = styled(Box)(({ isOwn }) => ({
  display: "flex",
  justifyContent: isOwn ? "flex-end" : "flex-start",
  marginBottom: "10px",
}));

const Message = styled(Paper)(({ isOwn }) => ({
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

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [searchContacts, setSearchContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const messageEndRef = useRef(null);
  const user = useSelector((state) => state.auth.login.currentUser);
  const senderId = user.id;
  const { receiverId: initialReceiverId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [receiverId, setReceiverId] = useState(initialReceiverId || null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleSearchSelect = (contact) => {
    setSearchQuery(contact.name);
    changeReceiver(contact.id);
    setMenuAnchorEl(null);
    // tai lai trang de useEffect chay lai
    window.location.reload();
  };

  const changeReceiver = (id) => {
    setReceiverId(id);
    socket.emit("leave_conversation", currentConversation?.id);
    // tai lai trang de cap nhat conversation moi
    navigate(`/messenger/${id}`);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      conversationId: currentConversation.id,
      senderId,
      receiverId,
      text: newMessage,
    };

    socket.emit("send_message", messageData);
    console.log("Message sent:", messageData);
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...messageData, isOwn: true, id: Math.random(), timestamp: new Date() },
    ]);
    setNewMessage("");
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (debouncedSearchQuery.trim()) {
          const { data } = await apiClient.post(`/user/find`, {
            name: debouncedSearchQuery,
          });
          setSearchContacts(data.data);
        } else {
          const { data } = await apiClient.get("/messages");
          console.log(data);
          setContacts(data);

          if (!receiverId && data.length > 0) {
            changeReceiver(data[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, [debouncedSearchQuery, receiverId, initialReceiverId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!receiverId) return;

      try {
        const { data } = await apiClient.get(`/messages/${receiverId}`);
        setMessages(
          data.map((msg) => ({
            ...msg,
            isOwn: msg.senderId === senderId,
          }))
        );
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const initConversation = async () => {
      if (!receiverId) return;

      try {
        const { data } = await apiClient.post("/messages/conversations", {
          senderId,
          receiverId,
        });
        setCurrentConversation(data);
        socket.emit("join_conversation", data.id);
      } catch (error) {
        console.error("Error initializing conversation:", error);
      }
    };

    fetchMessages();
    initConversation();
  }, [receiverId, senderId]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  // lang nghe su kien khi co user chua tung gui tin nhan gui tin nhan (new_conversation)
  useEffect(() => {
    socket.on("new_conversation", (data) => {
      setCurrentConversation(data);
    });

    return () => {
      socket.off("new_conversation");
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatContainer>
      <ContactsSection>
        <SearchContacts
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchContacts={searchContacts}
          handleSearchSelect={handleSearchSelect}
        />
        <List>
          {contacts.map((contact) => (
            <ListItem
              key={contact.id}
              onClick={() => changeReceiver(contact.id)}
              button
              sx={{
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
                <Badge>
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
          }}
        >
          <Typography variant="h6">Chat</Typography>
        </Box>
        <MessageContainer>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} isOwn={msg.isOwn}>
              <Message isOwn={msg.isOwn}>
                <Typography>{msg.text}</Typography>
                <Typography variant="caption">
                  {calculateTimeSince(msg.timestamp)}
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
                  <Tooltip title="Send message">
                    <IconButton onClick={handleSendMessage}>
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
  );
};

export default ChatApp;
