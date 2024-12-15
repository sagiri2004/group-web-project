import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const DialogAddFlashcardSet = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
  };

  const handleCreate = () => {
    if (title.trim() === "") {
      setIsTouched(true);
      return;
    }
    onCreate({ title, description });
    setTitle("");
    setDescription("");
    setIsTouched(false);
    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setIsTouched(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Flashcard</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new flashcard, please enter the title and description
          here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          onBlur={handleBlur}
          error={isTouched && title.trim() === ""}
          helperText={
            isTouched && title.trim() === "" ? "Title is required" : ""
          }
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleCreate} color="primary" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddFlashcardSet;
