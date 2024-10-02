// theme.js
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// Tạo theme với các tùy chỉnh cho light và dark mode
const theme = extendTheme({

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Tùy chỉnh cho light mode
        '*[data-mui-color-scheme="light"]': {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#6a5af9",
            borderRadius: "50px",
            backgroundImage: "linear-gradient(-45deg, #6a5af9, #d66efd)",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "white",
          },
        },
        // Tùy chỉnh cho dark mode
        '*[data-mui-color-scheme="dark"]': {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#d66efd",
            borderRadius: "50px",
            backgroundImage: "linear-gradient(-45deg, #d66efd, #6a5af9)",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#333",
          },
        },
      },
    },
  },
});

export default theme;
