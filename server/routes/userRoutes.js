const express = require("express")
const { userSignUp, getAllUsers, getUserById, userLogin } = require("../controller/userCtrl")
const {isStudent,isTeacher,isInstitute,auth} = require("../middlewares/auth")
const router = express.Router()

router.post("/signup",userSignUp)
router.post("/login",userLogin)
router.get("/getUser/:userId",getUserById)

// protected routes
router.get("/getAllUsers",auth,isTeacher,getAllUsers)
// router.get("/getAllUsers",getAllUsers)


module.exports = router 