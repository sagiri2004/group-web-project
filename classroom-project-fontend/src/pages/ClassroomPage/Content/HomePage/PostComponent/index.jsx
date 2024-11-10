import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Button, TextField } from "@mui/material";

function PostComponent({ onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    console.log("Title and content saved:", { title, content });
    if (onClose) {
      onClose();
    }
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
