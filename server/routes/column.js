const express = require("express");
const router = express.Router();
const column = require("../controllers/columnController");
const protect = require("../middlewares/protect");

router.use(protect);
router.post("/", column.create);
router.get("/:id", column.getColumnByBoardID);
router.patch("/:id", column.updateColumn);
router.delete("/:id", column.delete);

module.exports = router;
