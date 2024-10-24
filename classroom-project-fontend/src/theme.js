import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
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
