const authRouter = require("./auth");
const messageRouter = require("./message");
const flashcardRouter = require("./flashcards");

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/messages", messageRouter);
  app.use("/api/flashcard", flashcardRouter);
  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
};
