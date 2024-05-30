const catchAsync = require("../utils/catchAsync");

const {
  createCard,
  getCardByColumnID,
  deleteCardByID,
  updateCardData,
} = require("../services/cardService");

exports.createCard = catchAsync(async (req, res, next) => {
  const card = await createCard(req.body);

  res.status(201).json({
    status: "success",
    data: card,
  });
});

exports.getCardByColID = catchAsync(async (req, res, next) => {
  const card = await getCardByColumnID(req.params.columnID * 1);

  res.status(201).json({
    status: "success",
    data: card,
  });
});
exports.updateCard = catchAsync(async (req, res, next) => {
  const card = await updateCardData(req.params.id * 1, data);

  res.status(201).json({
    status: "success",
    data: card,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  await deleteCardByID(req.params.id * 1);

  res.status(204).json({
    status: "success",
  });
});
