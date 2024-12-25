import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton, // Import Skeleton
} from "@mui/material";
import apiClient from "~/api/apiClient";

function CommentDisplayComponent({
  postId,
  open,
  onClose,
  hasFetchedComments,
  setCommentCount,
}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true); // Trạng thái loading

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Chỉ gọi API nếu chưa gọi
  useEffect(() => {
    const fetchComments = async () => {
      if (hasFetchedComments) {
        try {
          setLoading(true); // Bắt đầu loading
          // Gửi yêu cầu API để lấy danh sách bình luận
          const response = await apiClient.get(
            `/classroom/list-comment/${postId}`
          );
          setComments(response.data.data);
          setLoading(false); // Dừng loading khi có dữ liệu
        } catch (error) {
          console.error("Failed to fetch comments: ", error);
          setLoading(false); // Dừng loading nếu có lỗi
        }
      }
    };

    fetchComments();
  }, [postId, hasFetchedComments]);

  // Hàm gửi bình luận mới
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Nếu bình luận rỗng thì không làm gì

    try {
      // Gửi yêu cầu API để thêm bình luận mới
      const response = await apiClient.post("/classroom/add-comment", {
        postId,
        content: newComment,
      });

      // Thêm bình luận mới vào danh sách bình luận
      setComments([...comments, response.data.comment]);
      setCommentCount((prev) => prev + 1); // Tăng số lượt bình luận
      setNewComment(""); // Làm sạch ô nhập liệu
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          {loading ? ( // Hiển thị Skeleton khi đang loading
            <>
              <Skeleton variant="text" width="80%" height={30} />
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="70%" height={20} />
            </>
          ) : comments.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No comments yet.
            </Typography>
          ) : (
            comments.map((comment) => (
              <Box key={comment.id} sx={{ marginBottom: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {comment.User.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {comment.content}
                </Typography>
              </Box>
            ))
          )}
        </Box>

        <Box>
          <TextField
            fullWidth
            label="Add a comment"
            value={newComment}
            onChange={handleCommentChange}
            multiline
            rows={4}
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button variant="contained" onClick={handleCommentSubmit}>
          Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentDisplayComponent;
