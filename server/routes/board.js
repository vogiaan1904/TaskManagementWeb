const express = require("express");
const router = express.Router();
const board = require("../controllers/boardController");
const protect = require("../middlewares/protect");

router.use(protect);
router.post("/", board.create);
router.get("/myBoard", board.getMyBoard);
router.get("/:id", board.getByID);
router.patch("/:id", board.updateBoard);
router.delete("/:id", board.delete);

module.exports = router;
