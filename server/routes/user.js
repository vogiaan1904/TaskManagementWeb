const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const user = require('../controllers/userController');
const protect = require('../middlewares/protect');
router.post("/auth/login", auth.login);
// router.post("/auth/refresh", auth.refreshToken);
router.post("/auth/register", auth.register);

router.use(protect); // Protect the /me route 
router.get("/me", user.getMe); // Add the route for /me
// router.get("/me", user.getMe, user.getUser);

module.exports = router;
