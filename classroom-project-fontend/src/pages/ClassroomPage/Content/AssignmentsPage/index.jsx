import { Box } from "@mui/system";
import AssignmentCard from "./AssignmentCard";
import AssignmentDetail from "./AssignmentDetail";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const demoData = [
  {
    id: 1,
    img: "https://example.com/path-to-image1.jpg",
    title: "Week 1",
    className: "IT3080 - Mạng máy tính",
    creationTime: "6:45 AM",
    dueTime: "11:59 PM",
  },
  {
    id: 2,
    img: "https://example.com/path-to-image2.jpg",
    title: "Week 2",
    className: "IT3080 - Mạng máy tính",
    creationTime: "7:00 AM",
    dueTime: "11:59 PM",
  },
  {
    id: 3,
    img: "https://example.com/path-to-image3.jpg",
    title: "Week 3",
    className: "IT3080 - Mạng máy tính",
    creationTime: "7:30 AM",
    dueTime: "11:59 PM",
  },
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
  const navigate = useNavigate();
  const { classroomId } = useParams();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("assignments");

  useEffect(() => {
    if (location.pathname.includes("assignments")) {
      setCurrentPath("assignments");
    } else {
      setCurrentPath("assignment");
    }
  }, [location]);

  const handleCardClick = (id) => {
    navigate(`/classroom/${classroomId}/assignment/${id}`);
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
          gap: 2,
        }}
      >
        {currentPath === "assignments" ? (
          demoData.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              {...assignment}
              onClick={() => handleCardClick(assignment.id)}
            />
          ))
        ) : (
          <AssignmentDetail data={demo} />
        )}
      </Box>
    </Box>
  );
}

export default AssignmentsPage;
