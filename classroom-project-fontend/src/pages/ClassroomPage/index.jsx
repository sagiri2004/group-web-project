import { Box, CircularProgress } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";

import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "~/api/apiClient";

function ClassroomPage() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("home");
  const { classroomId } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    apiClient.get(`/classroom/${classroomId}`).then((res) => {
      console.log(res);
      setClassroom(res.data.data.classroom);
      setLoading(false);
    });

    apiClient.get(`/classroom/check-is-admin/${classroomId}`).then((res) => {
      console.log(res);
      setIsAdmin(res.data.isAdmin);
    });
  }, [classroomId]);

  useEffect(() => {
    if (
      location.pathname.includes("assignments") ||
      location.pathname.includes("assignment")
    ) {
      setCurrentPath("assignments");
    } else if (location.pathname.includes("admin")) {
      setCurrentPath("admin");
    } else {
      setCurrentPath("home");
    }
  }, [location]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        // minHeight: "100vh",
      }}
    >
      <Sidebar classroom={classroom} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Header page={currentPath} isAdmin={isAdmin} />
        <Content page={currentPath} />
      </Box>
    </Box>
  );
}

export default ClassroomPage;
