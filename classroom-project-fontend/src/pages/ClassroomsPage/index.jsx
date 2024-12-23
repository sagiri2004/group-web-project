import {
  Box,
  Grid,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Skeleton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/system";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { useEffect, useState } from "react";

import ClassroomItem from "./ClassroomItem";
import apiClient from "~/api/apiClient";
import { uploadImageToCloudinary } from "~/api/cloudinary";

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
  },
}));

function ClassroomsPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [classrooms, setClassrooms] = useState([]);
  const [myClassrooms, setMyClassrooms] = useState([]);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [joinFormData, setJoinFormData] = useState({
    classroomId: "",
  });
  const [loading, setLoading] = useState(true);

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleJoinDialogOpen = () => {
    setJoinDialogOpen(true);
    handleMenuClose();
  };

  const handleJoinDialogClose = () => {
    setJoinDialogOpen(false);
  };

  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true);
    handleMenuClose();
  };

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
    setFormData({ name: "", description: "", image: null });
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      apiClient.get("/classroom/list"),
      apiClient.get("/classroom/list-created"),
    ])
      .then(([joinedResponse, createdResponse]) => {
        setClassrooms(joinedResponse.data.data);
        setMyClassrooms(createdResponse.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleJoinInputChange = (e) => {
    const { name, value } = e.target;
    setJoinFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateClassroom = async () => {
    try {
      let imageUrl = "";

      if (formData.image) {
        const uploadResult = await uploadImageToCloudinary(formData.image);
        imageUrl = uploadResult.secure_url;
      }

      const newClassroom = {
        name: formData.name,
        description: formData.description,
        imageUrl,
      };

      const response = await apiClient.post("/classroom/create", newClassroom);

      setMyClassrooms((prev) => [...prev, response.data.data.classroom]);
      handleCreateDialogClose();
    } catch (error) {
      console.error("Failed to create classroom:", error);
    }
  };

  const handleJoinClassroom = async () => {
    try {
      const response = await apiClient.post(`/classroom/join`, {
        classroomId: joinFormData.classroomId,
      });

      setClassrooms((prev) => [...prev, response.data.data.classroom]);
      handleJoinDialogClose();
    } catch (error) {
      console.error("Failed to join classroom:", error);
    }
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
          aria-controls={openMenu ? "join-create-classroom-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          disableElevation
          onClick={handleMenuClick}
          variant="outlined"
          startIcon={<GroupAddIcon />}
          sx={{ textTransform: "none" }}
        >
          Join or create classroom
        </Button>
        <StyledMenu
          id="join-create-classroom-menu"
          MenuListProps={{
            "aria-labelledby": "join-create-classroom-button",
          }}
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleJoinDialogOpen} disableRipple>
            <PersonAddAlt1Icon />
            Join classroom
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleCreateDialogOpen} disableRipple>
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
        <Typography variant="h6">My Created Classrooms</Typography>
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={3} sm={3} md={3} key={index}>
                <Skeleton variant="rectangular" height={150} />
              </Grid>
            ))}
          </Grid>
        ) : myClassrooms.length === 0 ? (
          <Typography>No classes created yet. Create one now!</Typography>
        ) : (
          <Grid container spacing={3}>
            {myClassrooms.map((classroom) => (
              <Grid item xs={3} sm={3} md={3} key={classroom.id}>
                <ClassroomItem classroom={classroom} />
              </Grid>
            ))}
          </Grid>
        )}

        <Typography variant="h6" sx={{ mt: 4 }}>
          Joined Classrooms
        </Typography>
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={3} sm={3} md={3} key={index}>
                <Skeleton variant="rectangular" height={150} />
              </Grid>
            ))}
          </Grid>
        ) : classrooms.length === 0 ? (
          <Typography>No joined classrooms. Join one now!</Typography>
        ) : (
          <Grid container spacing={3}>
            {classrooms.map((classroom) => (
              <Grid item xs={3} sm={3} md={3} key={classroom.id}>
                <ClassroomItem classroom={classroom} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Join Classroom Dialog */}
      <Dialog
        open={joinDialogOpen}
        onClose={handleJoinDialogClose}
        aria-labelledby="join-dialog-title"
      >
        <DialogTitle id="join-dialog-title">Join Classroom</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the code or ID to join an existing classroom.
          </DialogContentText>
          <TextField
            margin="dense"
            name="classroomId"
            label="Classroom ID"
            fullWidth
            value={joinFormData.classroomId}
            onChange={handleJoinInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleJoinDialogClose}>Cancel</Button>
          <Button onClick={handleJoinClassroom}>Join</Button>
        </DialogActions>
      </Dialog>

      {/* Create Classroom Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={handleCreateDialogClose}
        aria-labelledby="create-dialog-title"
      >
        <DialogTitle id="create-dialog-title">Create Classroom</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details to create a new classroom.
          </DialogContentText>
          <TextField
            margin="dense"
            name="name"
            label="Classroom Name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
          />
          <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
            Upload Avatar
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateDialogClose}>Cancel</Button>
          <Button onClick={handleCreateClassroom}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ClassroomsPage;
