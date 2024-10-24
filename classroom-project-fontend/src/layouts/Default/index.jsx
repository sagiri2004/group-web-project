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
      <Sidebar />
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
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
  );
}

export default Default;
