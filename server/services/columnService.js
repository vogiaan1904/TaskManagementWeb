const { PrismaClient } = require("@prisma/client");
const { deleteCardByBoardID, deleteCardByColumnID,createCard } = require("./cardService");

const prisma = new PrismaClient();

exports.getColumnByBoardID = async (boardID) => {
  try {
    const col = await prisma.column.findMany({
      where: {
        boardID,
      },
    });
    console.log("Columns retrieved from database:", col);
    return col;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.getColumnByID = async (id) => {
  try {
    const col = await prisma.column.findUnique({
      where: {
        id,
      },
    });

    return col;
  } catch (error) {
    console.log(error);
    return null;
  }
};
exports.deleteColumnByID = async (id) => {
  try {
    await deleteCardByColumnID(id);
    const col = await prisma.column.delete({
      where: {
        id: id * 1,
      },
    });

    return col;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.deleteColumnByBoardID = async (boardID) => {
  try {
    await deleteCardByBoardID(boardID);

    const col = await prisma.column.deleteMany({
      where: {
        boardID: boardID * 1,
      },
    });

    return col;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.createColumn = async (data) => {
  try {
    console.log("Creating column with data:", data);
    const columnData = { ...data, desc: data.desc || '' };
    const col = await prisma.column.create({
      data: columnData,
    });
    console.log("Column created successfully:", col);
    const card = await createCard({
      title: 'Card template',
      desc: '', // Or your desired default description
      columnID: col.id, // Use the newly created column ID
      boardID: data.boardID, // Get boardID from column data
    }); 
    console.log("Initial card created:", card);
    return col;

  } catch (error) {
    console.log(error);
    return null;
  }
};
exports.updateColumnData = async (id, data) => {
  try {
    const updateCol = await prisma.column.update({
      where: {
        id,
      },
      data,
    });

    return updateCol;
  } catch (error) {
    console.log(error);
    return null;
  }
};
