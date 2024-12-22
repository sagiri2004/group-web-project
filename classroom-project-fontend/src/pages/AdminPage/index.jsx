import React, { useState, useEffect } from "react";
import apiClient from "~/api/apiClient";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Snackbar,
  CircularProgress,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";

const UsersPage = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    password: "",
    avatar: "",
    roleId: 0,
    status: "active",
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    apiClient
      .get("/admin")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
        setSnackbarMessage("Error fetching users.");
        setSnackbarOpen(true);
      });
  };

  const handleCreateUser = () => {
    setLoading(true);
    apiClient
      .post("/admin", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setOpenCreateDialog(false);
        setLoading(false);
        setSnackbarMessage("User created successfully.");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setLoading(false);
        setSnackbarMessage("Error creating user.");
        setSnackbarOpen(true);
      });
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      setLoading(true);
      apiClient
        .put(`/admin/${selectedUser.id}`, selectedUser)
        .then(() => {
          const updatedUsers = users.map((user) =>
            user.id === selectedUser.id ? selectedUser : user
          );
          setUsers(updatedUsers);
          setOpenEditDialog(false);
          setLoading(false);
          setSnackbarMessage("User updated successfully.");
          setSnackbarOpen(true);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          setLoading(false);
          setSnackbarMessage("Error updating user.");
          setSnackbarOpen(true);
        });
    }
  };

  const handleDeleteUser = (id) => {
    setLoading(true);
    apiClient
      .delete(`/admin/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        setLoading(false);
        setSnackbarMessage("User deleted successfully.");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setLoading(false);
        setSnackbarMessage("Error deleting user.");
        setSnackbarOpen(true);
      });
  };

  const handleUpdateStatus = (id, status) => {
    setLoading(true);
    apiClient
      .patch(`/admin/${id}/status`, { status })
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, status } : user
        );
        setUsers(updatedUsers);
        setLoading(false);
        setSnackbarMessage(
          `User ${status === "active" ? "activated" : "suspended"}.`
        );
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
        setLoading(false);
        setSnackbarMessage("Error updating user status.");
        setSnackbarOpen(true);
      });
  };

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: theme.palette.primary.main,
          textAlign: "center",
          mb: 4,
        }}
      >
        Quản lý người dùng
      </Typography>

      <Button
        variant="contained"
        onClick={() => setOpenCreateDialog(true)}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          mb: 2,
          ":hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Thêm người dùng mới
      </Button>

      <TableContainer
        sx={{
          boxShadow: theme.shadows[3],
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <img
                    src={user.avatar || "/default-avatar.jpg"}
                    alt="Avatar"
                    width="40"
                    height="40"
                    style={{ borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.roleId === 1 ? "Admin" : "User"}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenEditDialog(true);
                    }}
                    variant="outlined"
                    sx={{
                      mr: 1,
                      color: theme.palette.info.main,
                      borderColor: theme.palette.info.main,
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    variant="outlined"
                    color="secondary"
                    sx={{
                      mr: 1,
                    }}
                  >
                    Xóa
                  </Button>
                  <Button
                    onClick={() =>
                      handleUpdateStatus(
                        user.id,
                        user.status === "active" ? "suspended" : "active"
                      )
                    }
                    variant="outlined"
                  >
                    {user.status === "active" ? "Suspend" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      >
        <DialogTitle>Thêm người dùng mới</DialogTitle>
        <DialogContent>{/* Các trường nhập */}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Hủy</Button>
          <Button onClick={handleCreateUser}>Thêm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
        <DialogContent>{/* Các trường chỉnh sửa */}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Hủy</Button>
          <Button onClick={handleUpdateUser}>Cập nhật</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default UsersPage;
