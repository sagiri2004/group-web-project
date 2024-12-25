import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import apiClient from "~/api/apiClient";

import CommentDisplayComponent from "./CommentDisplayComponent";

function PostDisplayComponent({
  title,
  content,
  avatar,
  name,
  username,
  time,
  likes, // Số lượt thích
  comments, // Số bình luận
  isLiked: initialIsLiked, // Trạng thái đã like hay chưa từ props
  id, // ID của bài viết
  userId, // ID của người dùng (cần để kiểm tra đã like hay chưa)
}) {
  // State theo dõi lượt thích và trạng thái đã like hay chưa
  const [isLiked, setIsLiked] = useState(initialIsLiked); // Dùng giá trị isLiked từ props
  const [likeCount, setLikeCount] = useState(likes); // Số lượt thích từ props
  const [isCommentOpen, setIsCommentOpen] = useState(false); // Trạng thái mở/đóng phần bình luận
  const [hasFetchedComments, setHasFetchedComments] = useState(false); // Trạng thái kiểm tra đã gọi API chưa
  const [commentCount, setCommentCount] = useState(comments); // Số lượt bình luận

  useEffect(() => {
    setIsLiked(initialIsLiked); // Cập nhật lại isLiked nếu giá trị props thay đổi
  }, [initialIsLiked]);

  // Hàm gọi API để like bài viết
  const handleLike = async () => {
    try {
      await apiClient.post("/classroom/like-post", { postId: id, userId });
      setIsLiked(true);
      setLikeCount(likeCount + 1); // Tăng số lượt thích
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Hàm gọi API để unlike bài viết
  const handleUnlike = async () => {
    try {
      await apiClient.post("/classroom/unlike-post", { postId: id, userId });
      setIsLiked(false);
      setLikeCount(likeCount - 1); // Giảm số lượt thích
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  // Hàm toggle mở/đóng phần bình luận
  const toggleComments = () => {
    if (!isCommentOpen && !hasFetchedComments) {
      setHasFetchedComments(true); // Đánh dấu là đã gọi API
    }
    setIsCommentOpen(!isCommentOpen);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          borderRadius: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[800],
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
            fontWeight: "bold",
            color: "primary.main",
            fontSize: "1.2rem",
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
            <IconButton onClick={isLiked ? handleUnlike : handleLike}>
              {isLiked ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {likeCount} {/* Hiển thị số lượt thích */}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={toggleComments}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {commentCount}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton color="inherit">
              <ShareOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>

      {/* Render phần bình luận nếu trạng thái isCommentOpen là true */}
      {isCommentOpen && (
        <CommentDisplayComponent
          postId={id}
          open={isCommentOpen}
          hasFetchedComments={hasFetchedComments} // Truyền trạng thái đã gọi API
          onClose={toggleComments}
          setCommentCount={setCommentCount} // Truyền hàm cập nhật số lượt bình luận
        />
      )}
    </Box>
  );
}

export default PostDisplayComponent;
