import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {
  saveChanges,
  saveChangeOrder,
  addFlashcard,
} from "~/redux/flashcardSetSlice";

import {
  DndContext,
  useSensor,
  MouseSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddBoxIcon from "@mui/icons-material/AddBox";

import EditFlashcard from "./EditFlashcard";
import mapOrder from "~/utils/sort";
import apiClient from "~/api/apiClient";

function EditListFlashcard({ flashcards, flashcardOrderIds, flashcardSetId }) {
  const [orderedFlashcards, setOrderedFlashcards] = useState([]);
  const [activeDragFlashcard, setActiveDragFlashcard] = useState(null);

  const changes = useSelector((state) => state.flashcardSet.changes);
  const dispatch = useDispatch();

  const debouncedUpdateFlashcardSet = debounce(() => {
    dispatch(saveChanges());
  }, 5000);

  useEffect(() => {
    if (changes.length > 0) {
      debouncedUpdateFlashcardSet();
    }

    return debouncedUpdateFlashcardSet.cancel;
  }, [changes, debouncedUpdateFlashcardSet]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    if (flashcards.length >= 0) {
      const newOrderedFlashcards = mapOrder(
        flashcards,
        flashcardOrderIds,
        "id"
      );
      console.log("New ordered flashcards:", newOrderedFlashcards);
      setOrderedFlashcards(newOrderedFlashcards);
    }
  }, [flashcards, flashcardOrderIds]);

  const onDragStart = (event) => {
    const { active } = event;
    setActiveDragFlashcard(active?.data?.current);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    const oldIndex = orderedFlashcards.findIndex(
      (flashcard) => flashcard.id === active.id
    );

    const newIndex = orderedFlashcards.findIndex(
      (flashcard) => flashcard.id === over.id
    );

    const newOrderedFlashcards = arrayMove(
      orderedFlashcards,
      oldIndex,
      newIndex
    );

    setOrderedFlashcards(newOrderedFlashcards);

    // save new order
    dispatch(
      saveChangeOrder([
        {
          setId: flashcardSetId,
          cardId: active.id,
          orderIndex: newIndex,
        },
      ])
    );

    // set null to active drag flashcard
    setActiveDragFlashcard(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: 0.5 } },
    }),
  };
  const handleAddFlashcard = async () => {
    try {
      // Gửi yêu cầu tạo flashcard mới
      const response = await apiClient.post(`/flashcards/terms`, {
        setId: flashcardSetId,
      });

      const newFlashcardId = response?.data?.data?.id;

      const newFlashcard = {
        id: newFlashcardId,
        word: "",
        definition: "",
      };

      console.log("New flashcard:", newFlashcard);

      const updatedFlashcards = [...orderedFlashcards, newFlashcard];
      setOrderedFlashcards(updatedFlashcards);

      setTimeout(() => {
        window.scrollBy({
          top: 200,
          behavior: "smooth",
        });
      }, 200);

      dispatch(
        addFlashcard({
          flashcardSetId,
          flashcard: newFlashcard,
        })
      );
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  console.log("Ordered flashcards:", orderedFlashcards);

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={orderedFlashcards
          .map((flashcard) => flashcard.id)
          .filter((id) => id !== undefined)}
        strategy={verticalListSortingStrategy}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          {orderedFlashcards.map((flashcard, index) => (
            <EditFlashcard
              key={flashcard.id || flashcard.id}
              flashcard={flashcard}
              flashcardSetId={flashcardSetId}
              rank={index + 1}
            />
          ))}
        </Box>
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeDragFlashcard ? (
          <EditFlashcard flashcard={activeDragFlashcard} />
        ) : null}
      </DragOverlay>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          width: "100%",
          my: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddBoxIcon />}
          sx={{ textTransform: "none" }}
          onClick={handleAddFlashcard}
        >
          Add Flashcard
        </Button>
      </Box>
    </DndContext>
  );
}

export default EditListFlashcard;
