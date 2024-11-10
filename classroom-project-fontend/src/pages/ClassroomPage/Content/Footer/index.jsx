import { Box, Button } from "@mui/material";
import PostComponent from "../HomePage/PostComponent";
import { useState } from "react";

function Footer() {
  const [isPostComponentOpen, setIsPostComponentOpen] = useState(false);
  const handleCreatePost = () => {
    setIsPostComponentOpen(true);
    window.scrollTo(0, document.body.scrollHeight);
  };
  return (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!isPostComponentOpen && (
        <Button variant="contained" color="primary" onClick={handleCreatePost}>
          Create Post
        </Button>
      )}
      {isPostComponentOpen && (
        <PostComponent onClose={() => setIsPostComponentOpen(false)} />
      )}
    </Box>
  );
}

export default Footer;
