import { Box } from "@mui/material";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Default({ children }) {
  return (
    <Box
      bgcolor={"bg-main"}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          width: "100%",
          height: (theme) => theme.custom.mainContentHeight,
          mt: (theme) => theme.custom.headerHeight,
        }}
      >
        <Sidebar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              paddingTop: 8,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Default;
