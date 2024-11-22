import { useState, useRef } from "react";
import { Box, CircularProgress, Button } from "@mui/material";
import Footer from "../Footer";
import PostDisplayComponent from "./PostDisplayComponent";

const initialPosts = [
  {
    title: "Post 1",
    value: "This is the content of post 1",
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
    name: "User 1",
  },
  {
    title: "Post 2",
    value: "This is the content of post 2",
    avatar: "https://material-ui.com/static/images/avatar/2.jpg",
    name: "User 2",
  },
  {
    title: "Post 3",
    value: "This is the content of post 3",
    avatar: "https://material-ui.com/static/images/avatar/3.jpg",
    name: "User 3",
  },
  {
    title: "Post 4",
    value: "This is the content of post 4",
    avatar: "https://material-ui.com/static/images/avatar/4.jpg",
    name: "User 4",
  },
];

function HomePage() {
  const [posts, setPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const handleScroll = () => {
    if (containerRef.current.scrollTop === 0 && !isLoading) {
      setIsLoading(true);

      setTimeout(() => {
        const newPosts = [
          {
            title: `Post ${posts.length + 1}`,
            value: `This is the content of post ${posts.length + 1}`,
            avatar: `https://material-ui.com/static/images/avatar/${
              (posts.length % 4) + 1
            }.jpg`,
            name: `User ${posts.length + 1}`,
          },
          {
            title: `Post ${posts.length + 2}`,
            value: `This is the content of post ${posts.length + 2}`,
            avatar: `https://material-ui.com/static/images/avatar/${
              ((posts.length + 1) % 4) + 1
            }.jpg`,
            name: `User ${posts.length + 2}`,
          },
        ];
        setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Thêm bài viết mới
        setIsLoading(false); // Tắt loading
      }, 2000);
    }
  };

  // Cuộn xuống cuối container
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth", // Hiệu ứng cuộn mượt
      });
    }
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
        onScroll={handleScroll}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: -2,
          overflow: "auto",

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
        {/* Loading Indicator */}
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <CircularProgress size={24} />
          </Box>
        )}

        <Box
          sx={{
            width: "60%",
            margin: "auto",
            display: "flex",
            flexDirection: "column-reverse",
            gap: 2,
          }}
        >
          {/* Hiển thị danh sách bài viết */}
          {posts.slice().map((post, index) => (
            <PostDisplayComponent key={index} {...post} />
          ))}
        </Box>
        {/* Nút Scroll to Bottom */}
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <Button variant="contained" color="primary" onClick={scrollToBottom}>
            Scroll to Bottom
          </Button>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

export default HomePage;
