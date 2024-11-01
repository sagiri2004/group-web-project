import { Box } from "@mui/material";

function Header() {
  return (
    <Box
      sx={{
        bgcolor: "bg-header",
        height: (theme) => theme.custom.headerHeight,
        width: "100%",
        padding: 2,
        position: "fixed",
        zIndex: 1000,
        py: 1,
        px: 3,
        paddingLeft: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "primary.dark",
      }}
    >
      Header
    </Box>
  );
}

export default Header;
