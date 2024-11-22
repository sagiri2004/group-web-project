import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlashcardSet } from "~/redux/flashcardSetSlice";

import IntroFlashcards from "./IntroFlashcards";
import DetailFlashcards from "./DetailFlashcards";
import mapOrder from "~/utils/sort";

function FlashCardPage() {
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
  const flashcardSet = useSelector((state) => state.flashcardSet.data);

  const orderedFlashcards = mapOrder(
    flashcardSet?.flashcards,
    flashcardSet?.flashcardOrderIds,
    "id"
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IntroFlashcards
        flashcardSet={flashcardSet}
        orderedFlashcards={orderedFlashcards}
      />
      <DetailFlashcards
        orderedFlashcards={orderedFlashcards}
        createdAt={flashcardSet?.createdAt}
      />
    </Box>
  );
}

export default FlashCardPage;
