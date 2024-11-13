import React from "react";
import { Card, Typography, Box, Avatar } from "@mui/material";
import { green } from "@mui/material/colors";

const AssignmentCard = ({
  img,
  title,
  className,
  creationTime,
  dueTime,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        display: "flex",
        borderRadius: 2,
        padding: 2,
        cursor: "pointer",
        width: "90%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
        {img ? (
          <Avatar src={img} sx={{ width: 56, height: 56 }} />
        ) : (
          <Avatar sx={{ bgcolor: green[500], width: 56, height: 56 }}>
            St
          </Avatar>
        )}
      </Box>
      <Box>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Class: {className}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Created: {creationTime}
        </Typography>
        <Typography variant="body2" color="error">
          Due: {dueTime}
        </Typography>
      </Box>
    </Card>
  );
};

export default AssignmentCard;
