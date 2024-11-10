import { Box } from "@mui/system";
import Footer from "../Footer";
import PostDisplayComponent from "./PostDisplayComponent";

const fakePosts = [
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
  return (
    <Box
      sx={{
        height: (theme) =>
          `calc(${theme.custom.mainContentHeight} - ${theme.custom.headerHeight})`,
        mt: "72px",
      }}
    >
      <Box
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
            backgroundImage: "blue",
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
          {fakePosts.map((post, index) => (
            <PostDisplayComponent key={index} {...post} />
          ))}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default HomePage;
