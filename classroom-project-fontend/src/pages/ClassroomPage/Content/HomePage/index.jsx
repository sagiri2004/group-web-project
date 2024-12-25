import { useState, useRef, useEffect } from "react";
import { Box, Button, Skeleton, Snackbar, Alert } from "@mui/material";
import PostDisplayComponent from "./PostDisplayComponent";
import PostComponent from "./PostComponent";
import apiClient from "~/api/apiClient";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const [isPostComponentOpen, setIsPostComponentOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const { classroomId } = useParams();
  const userId = useSelector((state) => state.auth.login.currentUser.id);

  const handleCreatePost = () => {
    setIsPostComponentOpen(true);
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(
          `/classroom/list-post/${classroomId}`
        );
        setPosts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch posts: ", error);
        setSnackbar({
          open: true,
          message: "Failed to load posts.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [classroomId]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [posts]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        height: (theme) =>
          `calc(${theme.custom.mainContentHeight} - ${theme.custom.headerHeight})`,
        mt: "72px",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: -2,
          overflow: "auto",
          scrollBehavior: "smooth",

          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#6a5af9",
            borderRadius: "50px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "none",
          },
        }}
      >
        <Box
          sx={{
            width: "60%",
            margin: "auto",
            display: "flex",
            flexDirection: "column-reverse",
            gap: 2,
          }}
        >
          {isLoading
            ? Array.from(new Array(3)).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width="100%"
                  height={160}
                  sx={{ borderRadius: 2 }}
                />
              ))
            : posts.map((post, index) => (
                <PostDisplayComponent
                  posts={posts}
                  key={index}
                  {...post}
                  userId={userId}
                />
              ))}
        </Box>
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePost}
            >
              Create Post
            </Button>
          )}
          {isPostComponentOpen && (
            <PostComponent
              posts={posts}
              setPosts={setPosts}
              onClose={() => setIsPostComponentOpen(false)}
              setSnackbar={setSnackbar} // Pass setSnackbar to PostComponent
            />
          )}
        </Box>
      </Box>
      <Box sx={{ position: "fixed", bottom: 0, right: 0, p: 2 }}>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="success" onClose={handleCloseSnackbar}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default HomePage;
