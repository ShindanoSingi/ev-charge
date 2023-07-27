const router = require("express").Router()
// const { authMiddleware } = require('../middlewares/authMiddleware');
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser
} = require("../controller/userController")

// Create a new user
router.post("/register", registerUser)
// Login user
router.post("/login", loginUser)
// Get current user
router.get("/current-user", authMiddleware, getCurrentUser)
// Logout user
router.post("/logout", authMiddleware, logoutUser)

module.exports = router
