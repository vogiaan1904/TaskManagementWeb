const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token)
    return next(new AppError("Bạn chưa đăng nhập, vui lòng đăng nhập", 401));
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!verified) {
    return next(new AppError("Lỗi xác thực", 401));
  }
  req.user = verified;
  next();
});
