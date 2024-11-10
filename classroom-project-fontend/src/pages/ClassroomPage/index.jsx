import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const fakeClassroomAPI = {
  id: "1",
  name: "Classroom 1",
  image:
    "https://scontent.fhan4-4.fna.fbcdn.net/v/t1.6435-9/201079238_323114566124845_3047653232260396125_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=bd9a62&_nc_eui2=AeFrEzkvGO6ywRIkle0uNKYOsDUUwcJe0nywNRTBwl7SfNufHzoEI7QvxK116Vl11GSHhum4TvI8aea8r_CFEqrA&_nc_ohc=EFNPiVSEHIAQ7kNvgH515bi&_nc_zt=23&_nc_ht=scontent.fhan4-4.fna&_nc_gid=AXK8ekjNpLJ9lU8uhVJ4qqC&oh=00_AYCpHHGVWfP_4OfLx4clkIIH-oQCrgNtIP9Bh2Txp02mOQ&oe=67487D53",
};

function ClassroomPage() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("home");

  useEffect(() => {
    if (location.pathname.includes("assignments")) {
      setCurrentPath("assignments");
    } else {
      setCurrentPath("home");
    }
  }, [location]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar classroom={fakeClassroomAPI} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Header page={currentPath} />
        <Content page={currentPath} />
      </Box>
    </Box>
  );
}

export default ClassroomPage;
