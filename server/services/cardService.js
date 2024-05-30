const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getCardByColumnID = async (columnID) => {
  try {
    const card = await prisma.card.findMany({
      where: {
        columnID,
      },
    });

    return card;
  } catch (error) {
    console.log(error);
    return null;
  }
};
exports.getCardByBoardID = async (boardID) => {
  try {
    const card = await prisma.card.findMany({
      where: {
        boardID,
      },
    });
    console.log("Cards retrieved from database:", card);
    return card;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.getCardByID = async (id) => {
  try {
    const card = await prisma.card.findUnique({
      where: {
        id,
      },
    });

    return card;
  } catch (error) {
    console.log(error);
    return null;
  }
};
exports.deleteCardByID = async (id) => {
  try {
    const col = await prisma.card.delete({
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
exports.deleteCardByColumnID = async (columnID) => {
  try {
    const col = await prisma.card.deleteMany({
      where: {
        columnID: id * 1,
      },
    });

    return col;
  } catch (error) {
    console.log(error);
    return null;
  }
};
exports.deleteCardByBoardID = async (boardID) => {
  try {
    const col = await prisma.card.deleteMany({
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

exports.createCard = async (data) => {
  try {
    console.log("Creating card with data:", data);
    const cardData = { ...data, desc: data.desc || '' };
    const card = await prisma.card.create({
      data: cardData,
    });
    console.log("Card created successfully:", card);
    return card;
  } catch (error) {
    console.log(error);
    return null;
  }
};
exports.updateCardData = async (id, data) => {
  try {
    const updateCard = await prisma.card.update({
      where: {
        id,
      },
      data,
    });

    return updateCard;
  } catch (error) {
    console.log(error);
    return null;
  }
};
