import React from "react";
import { Box, Typography, Paper, Avatar, Stack } from "@mui/material";

function PostDisplayComponent({ title, value, avatar, name }) {
  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Avatar src={avatar} alt={name} />
          <Typography variant="h6" component="div">
            {name}
          </Typography>
        </Stack>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </Paper>
    </Box>
  );
}

export default PostDisplayComponent;
