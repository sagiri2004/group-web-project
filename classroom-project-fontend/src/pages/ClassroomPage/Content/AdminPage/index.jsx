import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  LinearProgress,
  Snackbar,
  Alert,
  Tab,
  Tabs,
  CircularProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import apiClient from "~/api/apiClient";
import UserGrid from "./UserGrid";
import SubmissionGrid from "./SubmissionGrid";
import PropTypes from "prop-types";
import { PieChart } from "@mui/x-charts/PieChart";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [subLoading, setSubLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const { classroomId } = useParams();
  const [value, setValue] = useState(0);
  const [submissionData, setSubmissionData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [selectedUser, setSelectedUser] = useState(null); // For modal

  const handleUserClick = (id) => {
    const selected = submissionData.userSubmission.find(
      (submission) => submission.User.id === id
    );
    setSelectedUser(selected);
  };

  const handleCloseUserDialog = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/classroom/list-user/${classroomId}`)
      .then((response) => {
        setUsersData(response.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users. Please try again.");
        setLoading(false);
      });
  }, [classroomId]);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/classroom/list-assignment/${classroomId}`)
      .then((response) => {
        setAssignmentData(response.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch assignments. Please try again.");
        setLoading(false);
      });
  }, [classroomId]);

  useEffect(() => {
    if (assignmentData.length > 0) {
      const selectedAssignment = assignmentData[value];
      if (selectedAssignment) {
        const body = {
          classroomId: Number(classroomId),
        };
        if (selectedAssignment.id) {
          body.assignmentId = selectedAssignment.id;
        }
        setLoading(true);
        setSubLoading(true);
        apiClient
          .post(`/classroom/list-submission/${selectedAssignment.id}`, body)
          .then((response) => {
            setSubmissionData(response.data.data || []);
            setLoading(false);
            setSubLoading(false);
          })
          .catch((err) => {
            console.error("Failed to fetch submissions. Please try again.");
            setLoading(false);
          });
      }
      return () => {
        setSubmissionData([]);
      };
    }
  }, [value, assignmentData]);

  console.log("submissionData", submissionData);

  const handleDeleteClick = (id) => async () => {
    try {
      await apiClient.post(`/classroom/remove-user`, {
        classroomId: Number(classroomId),
        userId: id,
      });

      setUsersData((prevRows) => prevRows.filter((row) => row.id !== id));
      setAlert({
        open: true,
        message: "User removed successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to remove user:", error);
      setAlert({
        open: true,
        message: "Failed to remove user. Please try again.",
        severity: "error",
      });
    }
  };

  const handleAlertClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        height: (theme) =>
          `calc(${theme.custom.mainContentHeight} - ${theme.custom.headerHeight})`,
        mt: "72px",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: -2,
          overflow: "auto",
          width: "100%",

          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#6a5af9",
            borderRadius: "50px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "none",
          },
        }}
      >
        <Box
          sx={{
            width: "80%",
            minHeight: "75vh",
            maxHeight: "75vh",
            gap: 2,
            margin: "auto",
          }}
        >
          <Typography variant="h5" sx={{ my: 2 }}>
            Assignment Submissions
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="assignment tabs"
            >
              {assignmentData.map((assignment, index) => (
                <Tab
                  key={assignment.id}
                  label={assignment.title}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          {assignmentData.map((assignment, index) => (
            <CustomTabPanel key={assignment.id} value={value} index={index}>
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: submissionData.totalSubmitted,
                          label: "Submitted",
                        },
                        {
                          id: 1,
                          value:
                            submissionData.totalUser -
                            submissionData.totalSubmitted,
                          label: "Not submit",
                        },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              )}
            </CustomTabPanel>
          ))}
          <Typography variant="h6" sx={{ mt: 4 }}>
            User Submissions
          </Typography>
          {subLoading ? (
            <LinearProgress />
          ) : (
            <SubmissionGrid
              userSubmission={submissionData.userSubmission}
              loading={loading}
              handleUserClick={handleUserClick}
              assignment={submissionData.assignment}
            />
          )}
        </Box>
        <Box
          sx={{
            width: "80%",
            minHeight: "50vh",
            // display: "flex",
            // flexDirection: "column",
            gap: 2,
            margin: "auto",
            my: 2,
            pt: 24,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Classroom Users
          </Typography>
          {loading ? (
            <LinearProgress />
          ) : (
            <UserGrid
              usersData={usersData}
              loading={loading}
              handleDeleteClick={handleDeleteClick}
            />
          )}
        </Box>
      </Box>
      <Dialog
        open={!!selectedUser}
        onClose={handleCloseUserDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          {selectedUser ? (
            <Box>
              <Typography variant="h6">{selectedUser.User.name}</Typography>
              {selectedUser.content && (
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    height: "auto",
                    marginTop: 2,
                  }}
                  alt={selectedUser.User.name}
                  src={selectedUser.content}
                />
              )}
            </Box>
          ) : (
            <Typography>No Submission Found</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;
