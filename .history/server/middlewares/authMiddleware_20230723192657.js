const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = decoded.userId
    next()
  } catch (error) {
    res.send({
      message: error.message,
        success: false;
    })
  }
}

// const authMiddleware = asyncHandler(async (req, res, next) => {
//   let token
//   if (req?.headers?.authorization?.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1]

//     try {
//       if (token) {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const user = await User?.findById(decoded._id)
//         req.user = user
//         next()
//       }
//     } catch (error) {
//       throw new Error(
//         "Not Authorized token expired, Please try to Login again!"
//       )
//     }
//   } else {
//     throw new Error("There is no token attached to header")
//   }
// })

// const isAdmin = asyncHandler(async (req, res, next) => {
//   const { username } = req.user
//   const adminUser = await User.findOne({ username })
//   if (adminUser.role !== "admin") {
//     throw new Error("You are not an admin")
//   } else {
//     next()
//   }
// })

// module.exports = { authMiddleware, isAdmin }
