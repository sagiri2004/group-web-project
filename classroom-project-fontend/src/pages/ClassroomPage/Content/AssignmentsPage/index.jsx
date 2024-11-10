import { Box } from "@mui/system";

function AssignmentsPage() {
  return (
    <Box>
      <Box
        sx={{
          height: (theme) =>
            `calc(${theme.custom.mainContentHeight} - ${theme.custom.headerHeight})`,
          mt: (theme) => theme.custom.headerHeight,
        }}
      >
        Assignment
      </Box>
    </Box>
  );
}

export default AssignmentsPage;
