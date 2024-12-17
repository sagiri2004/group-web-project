import { Box, Button } from "@mui/material";
import PostComponent from "../HomePage/PostComponent";
import { useState } from "react";

function Footer(posts, setPosts) {
  const [isPostComponentOpen, setIsPostComponentOpen] = useState(false);
  const handleCreatePost = () => {
    setIsPostComponentOpen(true);
    window.scrollTo(0, document.body.scrollHeight);
  };

  console.log("Posts:", posts);
  console.log("SetPosts:", setPosts);
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
        <PostComponent
          posts={posts}
          setPosts={setPosts}
          onClose={() => setIsPostComponentOpen(false)}
        />
      )}
    </Box>
  );
}

export default Footer;
