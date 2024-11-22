import { Box, FormControl, Input, FormHelperText, Button } from "@mui/material";
import { debounce } from "lodash";
import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import DoneIcon from "@mui/icons-material/Done";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { updateFlashcardSet } from "~/redux/flashcardSetSlice";

function EditTitleForm({ title: firstTitle, description: firstDescription }) {
  const [title, setTitle] = useState(firstTitle);
  const [description, setDescription] = useState(firstDescription);
  const dispatch = useDispatch();
  const initialTitle = useRef(firstTitle);
  const initialDescription = useRef(firstDescription);
  const { id } = useParams();

  useEffect(() => {
    setTitle(firstTitle);
    setDescription(firstDescription);

    initialTitle.current = firstTitle;
    initialDescription.current = firstDescription;
  }, [firstTitle, firstDescription]);

  // Sử dụng useCallback để tạo ra hàm debounce chỉ một lần
  const debouncedUpdateFlashcardSet = useCallback(
    debounce((title, description) => {
      if (
        title !== initialTitle.current ||
        description !== initialDescription.current
      ) {
        // dispatch(updateFlashcardSet({ title, description })); // se dung sau
      }
    }, 5000),
    [dispatch]
  );

  // Sử dụng useEffect để gọi hàm debounce mỗi khi title hoặc description thay đổi
  useEffect(() => {
    debouncedUpdateFlashcardSet(title, description);

    // Cleanup để cancel debounce nếu component bị unmount
    return () => {
      debouncedUpdateFlashcardSet.cancel();
    };
  }, [title, description, debouncedUpdateFlashcardSet]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          sx={{
            textTransform: "none",
          }}
        >
          Back to set
        </Button>
        <Link to={`/flashcards/${id}`}>
          <Button variant="contained" endIcon={<DoneIcon />}>
            SAVE
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormControl variant="standard" sx={{ width: "40%" }}>
          <Input
            id="standard-adornment-title"
            aria-describedby="standard-title-helper-text"
            inputProps={{
              "aria-label": "TITLE",
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormHelperText id="standard-title-helper-text">TITLE</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={{ width: "40%" }}>
          <Input
            id="standard-adornment-description"
            aria-describedby="standard-description-helper-text"
            inputProps={{
              "aria-label": "DESCRIPTION",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormHelperText id="standard-description-helper-text">
            DESCRIPTION
          </FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
}

export default EditTitleForm;
