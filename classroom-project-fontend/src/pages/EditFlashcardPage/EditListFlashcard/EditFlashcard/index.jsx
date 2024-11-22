import { Paper, Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { debounce } from "lodash";
import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateFlashcardSet, deleteFlashcard } from "~/redux/flashcardSetSlice";

import {
  Box,
  FormControl,
  Input,
  FormHelperText,
  IconButton,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";

function EditFlashcard({ flashcard, flashcardSetId, rank }) {
  const [word, setWord] = useState(flashcard.word);
  const [definition, setDefinition] = useState(flashcard.definition);

  const initialWord = useRef(flashcard.word);
  const initialDefinition = useRef(flashcard.definition);

  const dispatch = useDispatch();

  useEffect(() => {
    setWord(flashcard.word);
    setDefinition(flashcard.definition);

    initialWord.current = flashcard.word;
    initialDefinition.current = flashcard.definition;
  }, [flashcard.word, flashcard.definition]);

  const debouncedUpdateFlashcard = useCallback(
    debounce((word, definition) => {
      if (
        word !== initialWord.current ||
        definition !== initialDefinition.current
      ) {
        if (word !== undefined && definition !== undefined) {
          // chi truyen nhung truong thay doi
          if (
            word !== initialWord.current &&
            definition === initialDefinition.current
          ) {
            dispatch(
              updateFlashcardSet({
                setId: flashcardSetId,
                cardId: flashcard._id || flashcard.id,
                word,
              })
            );
          }
          if (
            definition !== initialDefinition.current &&
            word === initialWord.current
          ) {
            dispatch(
              updateFlashcardSet({
                setId: flashcardSetId,
                cardId: flashcard._id || flashcard.id,
                definition,
              })
            );
          }
          if (
            word !== initialWord.current &&
            definition !== initialDefinition.current
          ) {
            dispatch(
              updateFlashcardSet({
                setId: flashcardSetId,
                cardId: flashcard._id || flashcard.id,
                word,
                definition,
              })
            );
          }
        }
      }
    }, 5000),
    [dispatch]
  );

  useEffect(() => {
    debouncedUpdateFlashcard(word, definition);

    return () => {
      debouncedUpdateFlashcard.cancel();
    };
  }, [word, definition, debouncedUpdateFlashcard]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: flashcard._id,
    // data: { ...flashcard },
    data: {
      ...flashcard,
      word,
      definition,
      rank,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      key={flashcard._id}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        px: 4,
        minHeight: "150px",
      }}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>{rank}</Typography>
        <Box>
          <IconButton
            sx={{
              height: "30px",
              width: "30px",
            }}
            {...listeners}
            // không cho kéo thả khi dữ liệu trống ở word và definition
            disabled={word === "" || definition === ""}
          >
            <DragHandleIcon />
          </IconButton>
          <IconButton
            sx={{
              height: "30px",
              width: "30px",
            }}
            onClick={() => {
              // Xóa flashcard
              dispatch(deleteFlashcard(flashcard._id || flashcard.id));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControl variant="standard" sx={{ width: "40%" }}>
          <Input
            id="standard-adornment-word"
            aria-describedby="standard-word-helper-text"
            inputProps={{
              "aria-label": "Word",
            }}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <FormHelperText id="standard-word-helper-text">Word</FormHelperText>
        </FormControl>
        <FormControl variant="standard" sx={{ width: "40%" }}>
          <Input
            id="standard-adornment-definition"
            aria-describedby="standard-definition-helper-text"
            inputProps={{
              "aria-label": "Definition",
            }}
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          />
          <FormHelperText id="standard-definition-helper-text">
            Definition
          </FormHelperText>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default EditFlashcard;
