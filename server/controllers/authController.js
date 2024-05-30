const generateToken = require("../utils/generateToken");
const catchAsync = require("../utils/catchAsync");
const {
  getUserByEmail,
  createUser,
  checkPassword,
  updateUserData,
} = require("../services/userService");
const bcrypt = require("bcrypt");

const {
  registerValidation,
  loginValidation,
} = require("../validations/authValidation");
const AppError = require("../utils/appError");

exports.register = catchAsync(async (req, res, next) => {
  console.log("Received registration request:", req.body);
  const { fullname, email, password } = req.body;
  // Validate
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).json({
      status: "failed",
      message: error.details[0].message,
    });

  // Checking email exist

  const isEmailExist = await getUserByEmail(email);
  if (isEmailExist) return next(new AppError("Email đã sử dụng", 400));

  const hashPassword = await bcrypt.hash(password, 12);

  await createUser({
    fullname,
    email,
    password: hashPassword,
    accesstoken: null,
    refreshtoken: null,
  });
  const data = { fullname, email };

  res.status(201).json({
    status: "success",
    data,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email and password does not exist
  if (!email || !password) {
    return next(new AppError("Vui lòng nhập email và mật khẩu", 400));
  }

  // Validate

  const { error } = loginValidation(req.body);

  if (error) return next(new AppError(error.details[0].message, 400));

  // Checking email
  const user = await getUserByEmail(email);
  if (!user) return next(new AppError("Email không tồn tại", 400));
  
  // Checking password
  if (!user || !(await checkPassword(password, user.password))) {
    return next(new AppError("Sai email hoặc mật khẩu", 401));
  }

  // Create token
  const { accessToken, refreshToken } = generateToken({
    id: user.id,
  });

  await updateUserData(user.id, {
    accesstoken: accessToken,
    refreshtoken: refreshToken,
  });

  res.status(200).json({
    status: "success",
    data: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      accessToken,
      refreshToken,
    },
  });
});
