import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import AssignmentCard from "./AssignmentCard";
import AssignmentDetail from "./AssignmentDetail";
import AssignmentCreation from "./AssignmentCreation";
import { useParams, useLocation } from "react-router-dom";
import apiClient from "~/api/apiClient";

function AssignmentsPage() {
  const { classroomId } = useParams();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("assignments");
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log("assignments:", assignments);

  useEffect(() => {
    if (location.pathname.includes("assignments")) {
      setCurrentPath("assignments");
    } else {
      setCurrentPath("assignment");
    }
  }, [location]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    apiClient
      .get(`classroom/list-assignment/${classroomId}`)
      .then((response) => {
        setAssignments(response.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch assignments. Please try again.");
        setLoading(false);
      });

    apiClient
      .get(`classroom/check-is-admin/${classroomId}`)
      .then((response) => {
        setIsAdmin(response.data.isAdmin);
      })
      .catch((err) => {
        console.error("Failed to check admin status:", err);
      });
  }, [classroomId]);

  const [assignmentId, setAssignmentId] = useState(null);
  const handleCardClick = (id) => {
    setAssignmentId(id);
    setCurrentPath("assignment");
  };

  const handleCreateAssignment = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCreate = async (newAssignment) => {
    console.log("Created assignment:", newAssignment);
    const data = await apiClient.post(`/classroom/add-assignment`, {
      classroomId,
      title: newAssignment.title,
      description: newAssignment.instructions,
      dueDate: newAssignment.dueDate,
    });
    console.log("Created assignment:", data.data.data.assignment);
    setAssignments((prevAssignments) => [
      ...prevAssignments,
      data.data.data.assignment,
    ]);
    setDialogOpen(false);
  };

  useEffect(() => {
    if (isDialogOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isDialogOpen]);

  const getDueStatus = (assignment) => {
    if (assignment.isSubmitted) {
      return assignment.isOnTime ? "Submitted on time" : "Submitted late";
    }
    return assignment.daysLeft > 0
      ? `Due in ${assignment.daysLeft} day(s)`
      : "Overdue";
  };

  return (
    <Box>
      <Box
        sx={{
          height: (theme) =>
            `calc(${theme.custom.mainContentHeight} - ${theme.custom.headerHeight})`,
          mt: (theme) => theme.custom.headerHeight,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isAdmin && currentPath === "assignments" && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateAssignment}
            sx={{ alignSelf: "flex-end", my: 1 }}
          >
            Create Assignment
          </Button>
        )}

        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : currentPath === "assignments" ? (
          assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              title={assignment.title}
              creationTime={new Date().toLocaleString()}
              dueTime={new Date(assignment.dueDate)}
              dueStatus={getDueStatus(assignment)}
              onClick={() => handleCardClick(assignment.id)}
            />
          ))
        ) : (
          <AssignmentDetail assignmentId={assignmentId} />
        )}
      </Box>

      <AssignmentCreation
        open={isDialogOpen}
        onClose={handleDialogClose}
        onCreate={handleCreate}
        dialogRef={dialogRef}
      />
    </Box>
  );
}

export default AssignmentsPage;
