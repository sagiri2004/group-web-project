import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { uploadImageToCloudinary } from "~/api/cloudinary";
import apiClient from "~/api/apiClient";

const AssignmentDetail = ({ assignmentId }) => {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [data, setData] = useState(null); // Ban đầu là null để kiểm tra trạng thái tải
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    apiClient
      .get(`/classroom/get-assignment/${assignmentId}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch assignment data:", err);
      });
  }, [assignmentId]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const url = await uploadImageToCloudinary(file);
        setUploadedFile(file);
        setData((prev) => ({ ...prev, content: url }));
        setAlertMessage("Image uploaded successfully!");
        setAlertSeverity("success");
      } catch (error) {
        setAlertMessage("Failed to upload image!");
        setAlertSeverity("error");
      } finally {
        setIsUploading(false);
        setAlertOpen(true);
      }
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setData((prev) => ({ ...prev, content: null }));
    fileInputRef.current.value = "";
  };

  const handleTurnIn = async () => {
    if (!data?.content) {
      setAlertMessage(
        "No file attached. Please upload a file before turning in."
      );
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.post(`/classroom/submit-assignment`, {
        content: data.content.url || data.content,
        assignmentId,
      });

      setAlertMessage("Assignment submitted successfully!");
      setAlertSeverity("success");
      setData((prev) => ({ ...prev, isSubmitted: true }));
    } catch (error) {
      setAlertMessage("Failed to submit assignment. Please try again.");
      setAlertSeverity("error");
    } finally {
      setIsSubmitting(false);
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  if (!data) {
    return (
      <Box
        sx={{
          padding: "24px",
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Skeleton variant="text" height={40} width="60%" />

        <Skeleton variant="text" height={30} width="40%" />

        <Divider sx={{ marginY: "16px" }} />

        <Skeleton variant="text" height={30} width="50%" />
        <Skeleton variant="text" height={20} width="100%" />
        <Skeleton variant="text" height={20} width="90%" />
        <Skeleton variant="text" height={20} width="80%" />

        <Skeleton
          variant="rectangular"
          height={200}
          width="100%"
          sx={{ borderRadius: "8px" }}
        />

        <Skeleton variant="text" height={30} width="50%" />

        <Skeleton variant="text" height={30} width="50%" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <Skeleton variant="rectangular" height={40} width="120px" />
          <Skeleton variant="rectangular" height={40} width="120px" />
        </Box>

        <Skeleton variant="rectangular" height={40} width="30%" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "24px",
        maxWidth: "800px",
        margin: "0 auto",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Typography variant="h4" sx={{ marginTop: "16px" }}>
        {data.title}
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        sx={{ marginBottom: "16px" }}
      >
        Due: {new Date(data.dueDate).toLocaleString()}
      </Typography>
      <Divider sx={{ marginY: "16px" }} />
      <Typography variant="h6" sx={{ marginBottom: "8px" }}>
        Description
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "24px" }}>
        {data.description || "No description available."}
      </Typography>
      {data.content && (
        <Box
          sx={{
            textAlign: "center",
            borderRadius: "8px",
            overflow: "hidden",
            height: "40%",
            width: "40%",
          }}
        >
          <img
            src={data.content.url || data.content}
            alt="Assignment Content"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        </Box>
      )}
      <Typography variant="h6" sx={{ marginBottom: "8px" }}>
        Submission Status
      </Typography>
      <Typography
        variant="body2"
        color={data.isSubmitted ? "success.main" : "error.main"}
        sx={{ marginBottom: "16px" }}
      >
        {data.isSubmitted ? "Submitted" : "Not Submitted"}
      </Typography>
      {/* My Work Section */}
      <Typography variant="h6" sx={{ marginBottom: "8px" }}>
        My Work
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <Button
          startIcon={<AttachFileIcon />}
          onClick={handleAttachClick}
          disabled={isUploading || isSubmitting}
        >
          {isUploading ? "Uploading..." : "Attach"}
        </Button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

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
      <Button
        variant="contained"
        color="primary"
        onClick={handleTurnIn}
        disabled={isSubmitting || isUploading}
        sx={{
          width: "30%",
        }}
      >
        {isSubmitting ? "Submitting..." : "Turn in"}
      </Button>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssignmentDetail;
