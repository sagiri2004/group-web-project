import { Box } from "@mui/material";

function Footer() {
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
        borderTop: "1px solid",
        borderColor: "primary.dark",
        mt: (theme) =>
          `calc(${theme.custom.mainContentHeight} - ${theme.custom.headerHeight})`,
      }}
    >
      Footer
    </Box>
  );
}

export default Footer;
