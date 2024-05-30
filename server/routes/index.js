const userRouter = require("./user");
const boardRouter = require("./board");
const columnRouter = require("./column");
const cardRouter = require("./card");

function route(app) {
  app.use("/api/user", userRouter);
  app.use("/api/board", boardRouter);
  app.use("/api/column", columnRouter);
  app.use("/api/card", cardRouter);
}

module.exports = route;
