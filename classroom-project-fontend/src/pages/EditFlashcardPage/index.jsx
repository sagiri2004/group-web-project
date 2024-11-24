import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlashcardSet } from "~/redux/flashcardSetSlice";

import EditTitleForm from "./EditTitleFrom";
import EditListFlashcard from "./EditListFlashcard";

// func convert correctFlashcardSet to flashcardSet
function convertFlashcardSet(flashcardSet) {
  const flashcards = flashcardSet.flashcards.map((flashcard) => {
    return {
      _id: flashcard.id,
      word: flashcard.word,
      definition: flashcard.definition,
    };
  });

  return {
    _id: flashcardSet.id,
    title: flashcardSet.title,
    description: flashcardSet.description,
    flashcardOrderIds: flashcardSet.flashcardOrderIds,
    flashcards: flashcards,
  };
}

function EditFlashcardPage() {
  const { id } = useParams();
  // call api to get flashcard set by id
  const dispatch = useDispatch();

  try {
    useEffect(() => {
      dispatch(fetchFlashcardSet(id));
    }, [dispatch, id]);
  } catch (error) {
    console.error("Fetch flashcard set error:", error);
  }
  // get flashcard set from redux store
  const rawFlashcardSet = useSelector((state) => state.flashcardSet.data);

  const flashcardSet = convertFlashcardSet(rawFlashcardSet);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <EditTitleForm
        title={flashcardSet.title}
        description={flashcardSet.description}
      />
      <Box
        width="80%"
        sx={{
          mt: 4,
        }}
      >
        <EditListFlashcard
          flashcards={flashcardSet.flashcards}
          flashcardOrderIds={flashcardSet.flashcardOrderIds}
          flashcardSetId={flashcardSet._id}
        />
      </Box>
    </Box>
  );
}

export default EditFlashcardPage;
