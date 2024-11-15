import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import AssignmentCard from "./AssignmentCard";
import AssignmentDetail from "./AssignmentDetail";
import AssignmentCreation from "./AssignmentCreation";
import { useParams, useLocation } from "react-router-dom";
import { format, isToday, isThisWeek, isPast } from "date-fns";

const demoData = [
  {
    id: 1,
    img: "https://example.com/path-to-image1.jpg",
    title: "Week 1",
    className: "IT3080 - Mạng máy tính",
    creationTime: "6:45 AM",
    dueTime: new Date("2024-10-21T23:59:00"),
  },
  {
    id: 2,
    img: "https://example.com/path-to-image2.jpg",
    title: "Week 2",
    className: "IT3080 - Mạng máy tính",
    creationTime: "6:45 AM",
    dueTime: new Date("2024-10-22T23:59:00"),
  },
  // ... more demo data
];

const demo = {
  title: "Week 1",
  dueDate: "October 21, 2024 11:59 PM",
  instructions:
    "Nộp ảnh 2 dây cable mạng (thẳng + chéo). Nhóm 4 người chọn ra 1 bạn để nộp bài cho cả nhóm. Khi nộp ghi rõ số nhóm và họ tên các thành viên trong nhóm.",
  points: "No points",
  status: "Not turned in",
};

function AssignmentsPage() {
  const { classroomId } = useParams();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("assignments");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef(null);
  const isAdmin = true;

  useEffect(() => {
    if (location.pathname.includes("assignments")) {
      setCurrentPath("assignments");
    } else {
      setCurrentPath("assignment");
    }
  }, [location]);

  const handleCardClick = (id) => {
    setCurrentPath("assignment");
  };

  const handleCreateAssignment = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCreate = (newAssignment) => {
    console.log("Created assignment:", newAssignment);
    setDialogOpen(false);
  };

  useEffect(() => {
    if (isDialogOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isDialogOpen]);

  const getDueStatus = (dueTime) => {
    if (isToday(dueTime)) {
      return "Due today";
    } else if (isThisWeek(dueTime)) {
      return "Due this week";
    } else if (isPast(dueTime)) {
      return "Overdue";
    } else {
      return `Due on ${format(dueTime, "MMMM d, yyyy")}`;
    }
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
        {/* Render the Create Assignment button only if isAdmin is true */}
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

        {currentPath === "assignments" ? (
          demoData.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              {...assignment}
              dueStatus={getDueStatus(assignment.dueTime)}
              onClick={() => handleCardClick(assignment.id)}
            />
          ))
        ) : (
          <AssignmentDetail data={demo} />
        )}
      </Box>

      {/* Assignment Creation Dialog with useRef */}
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
