const authRouter = require("./auth");
const messageRouter = require("./message");
const flashcardRouter = require("./flashcards");
const classroomRouter = require("./classroom");

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/messages", messageRouter);
  app.use("/api/flashcard", flashcardRouter);
  app.use("/api/classroom", classroomRouter);
  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
};
