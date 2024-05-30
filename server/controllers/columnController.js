const catchAsync = require("../utils/catchAsync");

const {
  getColumnByBoardID,
  deleteAllColumnByBoardID,
  createColumn,
  updateColumnData,
  deleteColumnByID,
} = require("../services/columnService");
const {
  // ... your other imports 
  createCard, // Import from cardService
} = require("../services/columnService");


exports.create = catchAsync(async (req, res, next) => {
  const col = await createColumn(req.body);


  res.status(201).json({
    status: "success",
    data: col,
  });
});

exports.getColumnByBoardID = catchAsync(async (req, res, next) => {
  const col = await getColumnByBoardID(req.params.id * 1);

  res.status(201).json({
    status: "success",
    data: col,
  });
});
exports.updateColumn = catchAsync(async (req, res, next) => {
  const col = await updateColumnData(req.params.id * 1, data);

  res.status(201).json({
    status: "success",
    data: col,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  await deleteColumnByID(req.params.id * 1);

  res.status(204).json({
    status: "success",
  });
});
