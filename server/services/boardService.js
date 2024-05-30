const { PrismaClient } = require("@prisma/client");
const { getCardByColumnID, getCardByBoardID } = require("./cardService");
const {
  getColumnByBoardID,
  deleteColumnByBoardID,
  createColumn,
} = require("../services/columnService");

const prisma = new PrismaClient();

exports.getBoardByUserID = async (userID) => {
  try {
    const board = await prisma.board.findMany({
      where: {
        ownerID: userID,
      },
    });

    return board;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.getBoardByID = async (id) => {
  try {
    const board = await prisma.board.findUnique({
      where: {
        id,
      },
      include: {
        Column: true, 
        Card: true,  
      } 
    });

    // Return only the board object, nothing else
        // Fetch columns and cards for this board

    return board;  
  } catch (error) {
    console.log(error);
    return null;
  }
};
exports.deleteBoardByID = async (id) => {
  try {
    await deleteColumnByBoardID(id);
    const board = await prisma.board.delete({
      where: {
        id: id * 1,
      },
    });

    return board;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.createBoard = async (data) => {
    const board = await prisma.board.create({
      data,
    });

      // Create the first column
    const column = await createColumn({ // <--- Add await here
      title: 'Column template', 
      desc: '', 
      boardID: board.id, 
    }); 
    console.log("Initial column created:", column);
    return board;
};
exports.updateBoardData = async (id, data) => {
  try {
    const updateBoard = await prisma.board.update({
      where: {
        id,
      },
      data,
    });

    return updateBoard;
  } catch (error) {
    console.log(error);
    return null;
  }
};
