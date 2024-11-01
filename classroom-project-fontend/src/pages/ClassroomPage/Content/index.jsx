import { Box } from "@mui/material";

function Content() {
  return (
    <Box
      sx={{
        height: (theme) =>
          `calc(${theme.custom.mainContentHeight} - ${theme.custom.headerHeight})`,
        mt: (theme) => theme.custom.headerHeight,
      }}
    >
      Content
    </Box>
  );
}

export default Content;
