import {
  Box,
  Grid,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/system";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { useState } from "react";

import ClassroomItem from "./ClassroomItem";

const fakeAPIClassrooms = [
  {
    id: 1,
    name: "Classroom 1",
    description: "This is classroom 1",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    id: 2,
    name: "Classroom 2",
    description: "This is classroom 2",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    id: 3,
    name: "Classroom 3",
    description: "This is classroom 3",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    id: 4,
    name: "Classroom 4",
    description: "This is classroom 4",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    id: 5,
    name: "Classroom 5",
    description: "This is classroom 5",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    id: 6,
    name: "Classroom 6",
    description: "This is classroom 6",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    id: 7,
    name: "Classroom 7",
    description: "This is classroom 7",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    id: 8,
    name: "Classroom 8",
    description: "This is classroom 8",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    id: 9,
    name: "Classroom 9",
    description: "This is classroom 9",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    id: 10,
    name: "Classroom 10",
    description: "This is classroom 10",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    id: 11,
    name: "Classroom 11",
    description: "This is classroom 11",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
  },
];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

function ClassroomsPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        mt: 2,
      }}
    >
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Classrooms</Typography>
        <Button
          id="join-create-classroom-button"
          aria-controls={open ? "join-create-classroom-button" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          disableElevation
          onClick={handleClick}
          variant="outlined"
          startIcon={<GroupAddIcon />}
          sx={{ textTransform: "none" }}
        >
          Join or create classroom
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <PersonAddAlt1Icon />
            Join classroom
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} disableRipple>
            <GroupAddIcon />
            Create classroom
          </MenuItem>
        </StyledMenu>
      </Box>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          mt: 2,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {fakeAPIClassrooms.map((classroom) => (
            <Grid item xs={3} sm={3} md={3} key={classroom.id}>
              <ClassroomItem classroom={classroom} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default ClassroomsPage;
