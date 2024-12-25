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
    email: "",
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

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/admin");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setSnackbarMessage("Error fetching users.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      setSnackbarMessage("Invalid email address.");
      setSnackbarOpen(true);
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.post("/admin", newUser);
      setUsers([...users, response.data]);
      setOpenCreateDialog(false);
      setSnackbarMessage("User created successfully.");
    } catch (error) {
      console.error("Error creating user:", error);
      setSnackbarMessage("Error creating user.");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleUpdateUser = async () => {
    if (
      !selectedUser?.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(selectedUser.email)
    ) {
      setSnackbarMessage("Invalid email address.");
      setSnackbarOpen(true);
      return;
    }

    try {
      setLoading(true);
      await apiClient.put(`/admin/${selectedUser.id}`, selectedUser);
      setUsers((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? selectedUser : user))
      );
      setOpenEditDialog(false);
      setSnackbarMessage("User updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error);
      setSnackbarMessage("Error updating user.");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      setLoading(true);
      await apiClient.delete(`/admin/${userId}`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setSnackbarMessage("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      setSnackbarMessage("Error deleting user.");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleUpdateStatus = async (userId, status) => {
    try {
      setLoading(true);
      await apiClient.patch(`/admin/${userId}/status`, { status });
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, status } : user))
      );
      setSnackbarMessage(`User status updated to ${status}.`);
    } catch (error) {
      console.error("Error updating status:", error);
      setSnackbarMessage("Error updating status.");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
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
              <TableCell>Email</TableCell>
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
                <TableCell>{user.email}</TableCell>
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
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Avatar"
            type="text"
            fullWidth
            value={newUser.avatar}
            onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
          />
          <Select
            fullWidth
            value={newUser.roleId}
            onChange={(e) => setNewUser({ ...newUser, roleId: e.target.value })}
            displayEmpty
            sx={{ mt: 2 }}
          >
            <MenuItem value={0}>User</MenuItem>
            <MenuItem value={1}>Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateUser} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={selectedUser?.username || ""}
            onChange={(e) =>
              setSelectedUser((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={selectedUser?.name || ""}
            onChange={(e) =>
              setSelectedUser((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={selectedUser?.email || ""}
            onChange={(e) =>
              setSelectedUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Avatar"
            type="text"
            fullWidth
            value={selectedUser?.avatar || ""}
            onChange={(e) =>
              setSelectedUser((prev) => ({ ...prev, avatar: e.target.value }))
            }
          />
          <Select
            fullWidth
            value={selectedUser?.roleId || 0}
            onChange={(e) =>
              setSelectedUser((prev) => ({ ...prev, roleId: e.target.value }))
            }
            displayEmpty
            sx={{ mt: 2 }}
          >
            <MenuItem value={0}>User</MenuItem>
            <MenuItem value={1}>Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateUser} variant="contained">
            Update
          </Button>
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
