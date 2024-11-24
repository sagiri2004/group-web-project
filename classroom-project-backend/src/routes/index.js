const authRouter = require("./auth");
const messageRouter = require("./message");

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/messages", messageRouter);
};
