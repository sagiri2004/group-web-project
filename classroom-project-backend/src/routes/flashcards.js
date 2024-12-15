const express = require("express");
const router = express.Router();
const flashcardsController = require("~/controllers/FlashcardsController");
const authenticateToken = require("~/middlewares/authenticateToken");
const checkUserLoggedIn = require("~/middlewares/checkUserLoggedIn");

// flashcards
router.put("/terms/save", flashcardsController.editFlashcard); // ok
router.delete("/terms/:id", flashcardsController.deleteFlashcard);
router.post("/terms", flashcardsController.addFlashcard); // ok

// flashcard sets
router.post(
  "/create",
  authenticateToken,
  flashcardsController.createFlashcardSet
); // ok
router.get(
  "/my-flashcard-sets",
  authenticateToken,
  flashcardsController.getMyFlashcardSets
); // ok
router.get("/:id", checkUserLoggedIn, flashcardsController.getFlashcardSet); // ok
router.delete("/:id", flashcardsController.deleteFlashcardSet); // ok

// lay ra user tao ra flashcard set
router.get("/author/:id", flashcardsController.getUserByFlashcardSetId);

module.exports = router;
