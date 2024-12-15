import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  useTheme,
} from "@mui/material";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AssignmentCreation = ({ open, onClose, onCreate, dialogRef }) => {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState({ title: false, dueDate: false });

  const handleValidation = () => {
    let hasError = false;
    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: true }));
      hasError = true;
    }
    if (!dueDate) {
      setErrors((prev) => ({ ...prev, dueDate: true }));
      hasError = true;
    }
    return !hasError;
  };

  const handleSubmit = () => {
    if (!handleValidation()) return;

    const newAssignment = {
      title,
      dueDate: dueDate ? dueDate.toISOString() : "",
      instructions,
    };

    onCreate(newAssignment);
    setTitle("");
    setDueDate(null);
    setInstructions("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      ref={dialogRef}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Create New Assignment
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: false }));
            }}
            error={errors.title}
            helperText={errors.title ? "Title is required" : ""}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              inputFormat="MM/dd/yyyy"
              value={dueDate}
              onChange={(newValue) => {
                setDueDate(newValue);
                setErrors((prev) => ({ ...prev, dueDate: false }));
              }}
              renderInput={(params) => <TextField {...params} />}
              error={errors.dueDate}
              helperText={errors.dueDate ? "Due date is required" : ""}
            />
          </LocalizationProvider>

          <TextField
            label="Instructions"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }}>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ boxShadow: theme.shadows[3] }}
        >
          Create Assignment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignmentCreation;
