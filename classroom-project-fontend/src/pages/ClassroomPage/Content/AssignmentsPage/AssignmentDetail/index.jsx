import React, { useRef, useState } from "react";
import { Box, Typography, Button, Divider, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const AssignmentDetail = ({ data }) => {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    fileInputRef.current.value = "";
  };

  return (
    <Box sx={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Assignment Title and Due Date */}
      <Typography variant="h4" sx={{ marginTop: "16px" }}>
        {data.title}
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        sx={{ marginBottom: "16px" }}
      >
        Due {data.dueDate}
      </Typography>

      {/* Divider */}
      <Divider sx={{ marginY: "16px" }} />

      {/* Instructions */}
      <Typography variant="h6" sx={{ marginBottom: "8px" }}>
        Instructions
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "24px" }}>
        {data.instructions}
      </Typography>

      {/* Submission Status */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="body2" sx={{ marginRight: "8px" }}>
          {data.status}
        </Typography>
        <Button variant="contained">Turn in</Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ marginY: "16px" }} />

      {/* My Work Section */}
      <Typography variant="h6" sx={{ marginBottom: "8px" }}>
        My work
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <Button startIcon={<AttachFileIcon />} onClick={handleAttachClick}>
          Attach
        </Button>

        {/* Hidden file input for image upload */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Show upload status if a file is selected */}
        {uploadedFile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircleIcon color="success" />
            <Typography variant="body2">{uploadedFile.name}</Typography>
            <IconButton onClick={handleRemoveFile} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AssignmentDetail;
