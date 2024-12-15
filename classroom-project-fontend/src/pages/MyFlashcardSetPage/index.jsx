import apiClient from "~/api/apiClient";
import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Tooltip, Button } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import FlashcardSet from "./FlashcardSet";
import DialogAddFlashcardSet from "./DialogAddFlashcardSet";

function MyFlashcardSetPage() {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  const handleCreateFlashcard = (newFlashcardSet) => {
    apiClient
      .post(`/flashcard/create`, newFlashcardSet)
      .then((response) => {
        const createdSet = response.data.data;
        setFlashcardSets((prev) => [...prev, createdSet]);
        handleClose();
      })
      .catch((error) => {
        console.error("Error creating flashcard set:", error);
      });
  };

  useEffect(() => {
    apiClient
      .get(`/flashcard/my-flashcard-sets`)
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        setFlashcardSets(data || []);
      })
      .catch((error) => {
        console.error("Error fetching flashcard sets:", error);
      });
  }, []);

  const handleClickFlashcardSet = (id) => {
    window.location.href = `/flashcards/${id}`;
    console.log("Clicked flashcard set with id:", id);
  };

  const handleRemoveFlashcardSet = (id) => {
    apiClient
      .delete(`/flashcard/${id}`)
      .then(() => {
        setFlashcardSets((prev) => prev.filter((set) => set.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting flashcard set:", error);
      });
  };

  return (
    <Box height="100%" p={5} px={7}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{ width: "70%" }}
      >
        <Typography variant="h4" fontWeight="bold">
          My Flashcard Sets
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create
        </Button>
      </Box>

      <Box sx={{ width: "70%" }}>
        {flashcardSets.length > 0 ? (
          <Box display="flex" gap={2} flexDirection="column">
            {flashcardSets.map((flashcardSet) => (
              <FlashcardSet
                key={flashcardSet.id}
                id={flashcardSet.id}
                title={flashcardSet.title}
                handleClickFlashcardSet={() =>
                  handleClickFlashcardSet(flashcardSet.id)
                }
                handleRemoveFlashcardSet={() =>
                  handleRemoveFlashcardSet(flashcardSet.id)
                }
              />
            ))}
          </Box>
        ) : (
          <Typography variant="h6" color="textSecondary" textAlign="center">
            You have not created any flashcard sets yet. Click "Create Flashcard
            Set" to start!
          </Typography>
        )}
      </Box>

      <DialogAddFlashcardSet
        open={dialogOpen}
        onClose={handleClose}
        onCreate={handleCreateFlashcard}
      />
    </Box>
  );
}

export default MyFlashcardSetPage;
