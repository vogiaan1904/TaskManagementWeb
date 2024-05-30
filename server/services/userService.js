const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.getUserByID = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.createUser = async (data) => {
  try {
    const user = await prisma.user.create({
      data,
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
exports.updateUserData = async (id, data) => {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return updateUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};
exports.checkPassword = async (plainPassword, userPassword) => {
  try {
    return await bcrypt.compare(plainPassword, userPassword);
  } catch (error) {
    console.log(error);
    return false;
  }
};
