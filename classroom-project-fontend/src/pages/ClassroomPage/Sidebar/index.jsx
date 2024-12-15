import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  Collapse,
  Avatar,
  Typography,
  Button,
  Divider,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

const NAVIGATION = [
  {
    segment: "general",
    title: "General",
    icon: <HomeIcon />,
  },
  {
    segment: "files",
    title: "Files",
    icon: <FolderIcon />,
  },
  {
    segment: "quizzes",
    title: "Quizzes",
    icon: <QuizIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "members",
    title: "Members",
    icon: <PeopleIcon />,
  },
];

function Sidebar({ classroom }) {
  const [openSegments, setOpenSegments] = useState({});
  const [isSelected, setIsSelected] = useState("");

  const handleOpen = (nav) => {
    if (nav?.children && nav.children.length > 0) {
      setOpenSegments((prevOpenSegments) => ({
        ...prevOpenSegments,
        [nav.segment]: !prevOpenSegments[nav.segment],
      }));

      if (isSelected === nav.segment) {
        setIsSelected("");
      } else {
        setIsSelected(nav.segment);
      }
    } else {
      console.log(nav.segment);
    }
  };

  return (
    <Box
      sx={{
        borderRight: "1px solid",
        borderColor: "primary.dark",
        width: 320,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          px: "20px",
          pb: "20px",
          gap: "20px",
        }}
      >
        <Button
          startIcon={<ArrowBackIosIcon />}
          sx={{
            color: "primary.text",
            textTransform: "none",
            width: "fit-content",
          }}
        >
          Back to all classrooms
        </Button>
        <Avatar
          variant="rounded"
          src={classroom.imageUrl}
          sx={{
            width: 80,
            height: 80,
          }}
        />
        <Typography variant="h6">{classroom.name}</Typography>
      </Box>
      <Divider />
      <List>
        {NAVIGATION.map((nav) => (
          <Box key={nav.segment}>
            <ListItemButton
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                height: "64px",
              }}
              selected={isSelected === nav.segment}
              onClick={() => handleOpen(nav)}
            >
              <ListItemIcon
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {nav.icon}
              </ListItemIcon>
              <ListItemText primary={nav.title} />
            </ListItemButton>
            {nav.children && (
              <Collapse
                in={openSegments[nav.segment]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {nav.children.map((child) => (
                    <ListItemButton
                      key={child.segment}
                      sx={{
                        borderLeft: "1px solid",
                        borderColor: "primary.dark",
                        height: "48px",
                        pl: "40px",
                      }}
                    >
                      <ListItemIcon>{child.icon}</ListItemIcon>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
