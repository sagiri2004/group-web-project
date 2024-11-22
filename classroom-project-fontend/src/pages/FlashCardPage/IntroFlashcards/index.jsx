import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import Header from "./Header";
import Flashcard from "./Flashcard";
import Footer from "./Footer";

function IntroFlashcards({ flashcardSet = {}, orderedFlashcards = [] }) {
  const [flashcards, setFlashcards] = useState(orderedFlashcards);

  useEffect(() => {
    if (orderedFlashcards && Array.isArray(orderedFlashcards)) {
      setFlashcards(orderedFlashcards);
    }
  }, [orderedFlashcards]);

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const currentFlashcard = flashcards[currentFlashcardIndex];
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNextFlashcard = () => {
    if (currentFlashcardIndex < flashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevFlashcard = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped((prevState) => !prevState);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowRight":
        handleNextFlashcard();
        break;
      case "ArrowLeft":
        handlePrevFlashcard();
        break;
      case " ":
      case "ArrowUp":
      case "ArrowDown":
        handleFlip();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentFlashcardIndex, isFlipped]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
      }}
    >
      <Header
        title={flashcardSet?.title}
        description={flashcardSet?.description}
      />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "60vh",
        }}
      >
        <Flashcard
          data={currentFlashcard?.word}
          isFlipped={isFlipped}
          onClick={handleFlip}
        />
        <Flashcard
          data={currentFlashcard?.definition}
          backCard
          isFlipped={isFlipped}
          onClick={handleFlip}
        />
      </Box>
      <Footer
        handleNextFlashcard={handleNextFlashcard}
        handlePrevFlashcard={handlePrevFlashcard}
        currentFlashcardIndex={currentFlashcardIndex}
        flashcardsLength={flashcards.length}
      />
    </Box>
  );
}

export default IntroFlashcards;
