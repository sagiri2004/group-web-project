import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlashcardSet } from "~/redux/flashcardSetSlice";
import apiClient from "~/api/apiClient";
import { useState } from "react";

import IntroFlashcards from "./IntroFlashcards";
import DetailFlashcards from "./DetailFlashcards";
import mapOrder from "~/utils/sort";

function FlashCardPage() {
  const { id } = useParams();
  // call api to get flashcard set by id
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  useEffect(() => {
    // get author of flashcard set
    const getAuthor = async () => {
      try {
        const response = await apiClient.get(`/flashcard/author/${id}`);
        setUser(response.data.data);
        console.log("Get author success:", response.data);
      } catch (error) {
        console.error("Get author error:", error);
      }
    };

    getAuthor();

    return () => {
      setUser({});
    };
  }, []);

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
        overflow: "auto",
      }}
    >
      <IntroFlashcards
        flashcardSet={flashcardSet}
        orderedFlashcards={orderedFlashcards}
      />
      <DetailFlashcards
        orderedFlashcards={orderedFlashcards}
        createdAt={flashcardSet?.createdAt}
        user={user}
      />
    </Box>
  );
}

export default FlashCardPage;
