import { Box, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const headerPages = {
  home: 0,
  assignments: 1,
};

function Header({ page }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(headerPages[page]);
  }, [page]);

  const navigate = useNavigate();
  const { classroomId } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate(`/classroom/${classroomId}`);
    } else {
      navigate(`/classroom/${classroomId}/assignments`);
    }
  };
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
      <Box sx={{ width: "100%", height: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Assignment" {...a11yProps(1)} />
        </Tabs>
      </Box>
    </Box>
  );
}

export default Header;
