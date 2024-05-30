const express = require("express");
const router = express.Router();
const card = require("../controllers/cardController");
const protect = require("../middlewares/protect");

router.use(protect);
router.post("/", card.createCard);
router.get("/column/:id", card.getCardByColID);
router.patch("/:id", card.updateCard);
router.delete("/:id", card.delete);

module.exports = router;
