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
  admin: 2,
};

function Header({ page, isAdmin }) {
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
    } else if (newValue === 1) {
      navigate(`/classroom/${classroomId}/assignments`);
    } else if (newValue === 2) {
      navigate(`/classroom/${classroomId}/admin`);
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
          {isAdmin && <Tab label="Admin" {...a11yProps(2)} />}
        </Tabs>
      </Box>
    </Box>
  );
}

export default Header;
