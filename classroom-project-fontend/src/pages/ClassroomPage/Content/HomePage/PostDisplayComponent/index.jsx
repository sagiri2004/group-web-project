import React from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function PostDisplayComponent({
  title,
  content,
  avatar,
  name,
  username,
  time,
}) {
  // Tạo số ngẫu nhiên cho tim và comment
  const randomLikes = Math.floor(Math.random() * 20) + 1; // 1 đến 20
  const randomComments = Math.floor(Math.random() * 20) + 1; // 1 đến 20

  return (
    <Box sx={{ padding: 2 }}>
      {/* Thêm màu sắc cho Paper */}
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          borderRadius: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100] // Màu sáng cho light theme
              : theme.palette.grey[800], // Màu tối cho dark theme
        }}
      >
        {/* Header: Avatar + Name + Username + Options */}
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Avatar src={avatar} alt={name} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{username} · {time}
            </Typography>
          </Box>
          <IconButton sx={{ marginLeft: "auto" }}>
            <MoreHorizIcon />
          </IconButton>
        </Stack>

        {/* Content: Title + Body */}
        <Typography
          variant="body1"
          sx={{
            marginBottom: 1,
            fontWeight: "bold", // Làm cho chữ đậm hơn
            color: "primary.main", // Đổi màu chữ (sử dụng màu chính của theme)
            fontSize: "1.2rem", // Tăng kích thước chữ
          }}
        >
          {title}
        </Typography>
        <div
          style={{ marginBottom: "1rem" }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Footer: Like, Comment, Share */}
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton color="inherit">
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {randomComments}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton color="inherit">
              <FavoriteBorderIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {randomLikes}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton color="inherit">
              <ShareOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default PostDisplayComponent;
