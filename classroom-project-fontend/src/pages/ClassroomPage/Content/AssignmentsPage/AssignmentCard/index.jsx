import React from "react";
import { Card, Typography, Box } from "@mui/material";

const AssignmentCard = ({
  title,
  creationTime,
  dueTime,
  dueStatus,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        padding: 2,
        cursor: "pointer",
        width: "90%",
        my: 1,
      }}
    >
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Created: {creationTime}
      </Typography>
      <Typography variant="body2" color="error">
        Due: {dueTime.toLocaleString()}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ fontWeight: "bold" }}
      >
        {dueStatus}
      </Typography>
    </Card>
  );
};

export default AssignmentCard;
