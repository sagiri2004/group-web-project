import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Button, TextField } from "@mui/material";
import apiClient from "~/api/apiClient";
import { useParams } from "react-router-dom";

function PostComponent({ onClose, posts = [], setPosts, setSnackbar }) {
  // Default posts to an empty array
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { classroomId } = useParams();

  const handleSave = async () => {
    console.log("Title and content saved:", { title, content });

    const data = await apiClient.post("/classroom/create-post", {
      title,
      content,
      classroomId,
    });
    setPosts([data.data.data.post, ...posts]);

    setTitle("");
    setContent("");
    if (onClose) {
      onClose();
    }

    setSnackbar({
      open: true,
      message: "Post created successfully",
    });
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
    if (onClose) {
      onClose();
    }
  };

  return (
    <Box
      sx={{
        width: "60%",
      }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
          sx={{ ml: 2 }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
}

export default PostComponent;
