import {
  Avatar,
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Fab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";

import SettingPageSkeleton from "./Skeleton";

import { useDispatch } from "react-redux";
import { updateUser, fetchUser } from "~/redux/userSlice";

const animalImages = [
  "https://assets.quizlet.com/static/i/animals/126.70ed6cbb19b8447.jpg",
  "https://assets.quizlet.com/static/i/animals/125.a46eeeaa1617163.jpg",
  "https://assets.quizlet.com/static/i/animals/124.e99fa024b6881c1.jpg",
  "https://assets.quizlet.com/static/i/animals/123.e5f0bd4b49e7c12.jpg",
  "https://assets.quizlet.com/static/i/animals/122.c263b6b48ca2b1a.jpg",
  "https://assets.quizlet.com/static/i/animals/121.86d7c15a5a6be0f.jpg",
  "https://assets.quizlet.com/static/i/animals/120.bd14e2049ea1628.jpg",
  "https://assets.quizlet.com/static/i/animals/119.ed0b39ac3915639.jpg",
  "https://assets.quizlet.com/static/i/animals/118.17bed2945aa1600.jpg",
  "https://assets.quizlet.com/static/i/animals/117.3cd40b021ac604f.jpg",
  "https://assets.quizlet.com/static/i/animals/116.9aaedd4f4495837.jpg",
  "https://assets.quizlet.com/static/i/animals/115.70946d9217589e8.jpg",
  "https://assets.quizlet.com/static/i/animals/114.0adc064c9a6d1eb.jpg",
  "https://assets.quizlet.com/static/i/animals/113.e4b7e1c4ed27afa.jpg",
  "https://assets.quizlet.com/static/i/animals/112.c90135dfc341a90.jpg",
  "https://assets.quizlet.com/static/i/animals/111.f9dd73353feb908.jpg",
  "https://assets.quizlet.com/static/i/animals/110.36d90f6882d4593.jpg",
  "https://assets.quizlet.com/static/i/animals/109.5b75ca8158c771c.jpg",
  "https://assets.quizlet.com/static/i/animals/108.3b3090077134db3.jpg",
  "https://assets.quizlet.com/static/i/animals/107.c3e123902d831a9.jpg",
];

function SettingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [user, setUser] = useState({
    avatar: null,
    name: null,
  });
  const dispatch = useDispatch();

  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUser())
      .unwrap()
      .then((res) => {
        setCurrentUser(res);
        setSelectedAvatar(res.avatar);
        setUser(res);
        setName(res.name);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          py: "2rem",
        }}
      >
        <SettingPageSkeleton />
      </Box>
    );
  }

  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    console.log("avatar", avatar);
    setUser((prevUser) => ({ ...prevUser, avatar: avatar }));
  };

  const handleSave = async () => {
    await dispatch(updateUser(user));
    handleClose();
    window.location.href = "/";
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
    setUser((prevUser) => ({ ...prevUser, name: e.target.value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        py: "2rem",
      }}
    >
      <Box>
        <Typography variant="h3">Settings</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "60%",
        }}
      >
        <Box>
          <Typography>Personal information</Typography>
        </Box>
        <Paper>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              p: "1rem",
            }}
          >
            <Typography>Profile picture</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Avatar
                  src={selectedAvatar}
                  sx={{ width: 100, height: 100 }}
                  alt="avatar"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={currentUser?.avatar}
                  sx={{ width: 50, height: 50, mx: 1 }}
                  alt="avatar 1"
                  onClick={() => handleSelectAvatar(currentUser?.avatar)}
                  style={{
                    border:
                      selectedAvatar === currentUser?.avatar
                        ? "2px solid blue"
                        : "none",
                  }}
                />
                {animalImages.map((img, index) => (
                  <Avatar
                    key={index}
                    src={img}
                    sx={{ width: 50, height: 50, mx: 1 }}
                    alt={`avatar ${index + 2}`}
                    onClick={() => handleSelectAvatar(img)}
                    style={{
                      border:
                        selectedAvatar === img ? "2px solid blue" : "none",
                    }}
                  />
                ))}

                <Fab
                  color="primary"
                  aria-label="add"
                  sx={{ width: 50, height: 50, mx: 1, zIndex: 1 }}
                  onClick={() => handleSelectAvatar(null)}
                >
                  <AddIcon />
                </Fab>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              p: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Username</Typography>
            <TextField
              id="username-read-only-input"
              defaultValue={currentUser?.username}
              disabled
            />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              p: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Name</Typography>
            <TextField
              id="name-input"
              value={name}
              onChange={handleChangeName}
            />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              p: "1rem",
            }}
          >
            <Typography>Change password</Typography>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "60%",
        }}
      >
        <Box>
          <Typography>Appearance</Typography>
          <Paper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                p: "1rem",
              }}
            >
              <Typography>Theme</Typography>
              <SelectTheme />
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "60%",
        }}
      >
        <Box>
          <Typography>Account and privacy</Typography>
          <Paper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                p: "1rem",
              }}
            >
              <Typography>Privacy</Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "1rem",
                justifyContent: "space-between",
              }}
            >
              <Typography>Delete account</Typography>
              <Button variant="contained" color="error">
                Delete account
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "6rem",
          right: "6rem",
        }}
        onClick={handleClickOpen}
      >
        <DoneIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to save the changes?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By clicking Agree, you will save the changes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleSave} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SettingPage;
