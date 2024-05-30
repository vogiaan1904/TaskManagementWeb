// server/controllers/userController.js
const catchAsync = require("../utils/catchAsync");
const { getUserByID } = require("../services/userService");

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await getUserByID(req.user.id); // Get user from database using ID from the token

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
});