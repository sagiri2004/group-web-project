const message = require("~/models/message");
const flashcardService = require("~/services/flashcardService");

class FlashcardsController {
  // create flashcard set
  async createFlashcardSet(req, res) {
    const rawFlashcardSetData = req.body;
    const user = req.user;
    try {
      const result = await flashcardService.createFlashcardSet(
        rawFlashcardSetData,
        user
      );

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // get flashcard set
  async getFlashcardSet(req, res) {
    const { id } = req.params;
    const user = req.user;
    try {
      const result = await flashcardService.getFlashcardSet(id, user);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // edit flashcard
  async editFlashcard(req, res) {
    const rawData = req.body;

    try {
      const result = await flashcardService.editFlashcard(rawData);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // delete flashcard set
  async deleteFlashcardSet(req, res) {
    const { id } = req.params;

    try {
      const result = await flashcardService.deleteFlashcardSet(id);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // delete flashcard
  async deleteFlashcard(req, res) {
    const { id } = req.params;

    try {
      const result = await flashcardService.deleteFlashcard(id);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // add flashcard
  async addFlashcard(req, res) {
    const { setId } = req.body;

    try {
      const result = await flashcardService.createFlashcard(setId);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // get my flashcard sets
  async getMyFlashcardSets(req, res) {
    const user = req.user;
    try {
      const result = await flashcardService.getMyFlashcardSets(user);
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = new FlashcardsController();
