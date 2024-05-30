const catchAsync = require("../utils/catchAsync");
const { getColumnByBoardID } = require("../services/columnService"); // Import for fetching columns
const { getCardByBoardID } = require("../services/cardService"); 
const {
  createBoard,
  getMyBoard,
  getBoardByUserID,
  deleteBoardByID,
  getBoardByID,
  updateBoardData,
  createCard,
} = require("../services/boardService");

exports.create = catchAsync(async (req, res, next) => {
  try{

  console.log("Board creation request:", req.body);
  const board = await createBoard({ ...req.body, ownerID: req.user.id });
  console.log("New board created:", board);

  res.status(201).json({
    status: "success",
    data: board,
  });
} catch (error){
  console.error("Error during board creation:", error);
  return res.status(500).json({ 
    status: 'error', 
    message: error.message || 'Internal Server Error' 
  });
}
});

exports.getByID = catchAsync(async (req, res, next) => {
  const boardId = req.params.id * 1; 
  console.log("Board ID:", boardId); 
  const board = await getBoardByID(boardId); 
  console.log("Board Data:", board);

  // Fetch the columns and cards
  const columns = await getColumnByBoardID(boardId);
  console.log("Columns fetched:", columns);
  const cards = await getCardByBoardID(boardId);
  console.log("Cards:", cards);
  
  // Structure the response correctly
  res.status(201).json({
    status: "success",
    data: {
      board: board,  // Assign the board object directly to "board"
      columnData: columns, 
      cardData: cards, 
    },
  });
});

exports.getMyBoard = catchAsync(async (req, res, next) => {
  const board = await getBoardByUserID(req.user.id);
  res.status(201).json({
    status: "success",
    data: board,
  });
});
exports.updateBoard = catchAsync(async (req, res, next) => {
  const board = await updateBoardData(req.body);

  res.status(201).json({
    status: "success",
    data: board,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  await deleteBoardByID(req.params.id);

  res.status(204).json({
    status: "success",
  });
});
