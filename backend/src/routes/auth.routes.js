const {Router}=require("express")
const { registerUserController, loginUserController, logoutUserController, getUserInfoController } = require("../controllers/auth.controller.js")
const authMiddleware=require("../middlewares/auth.middleware.js")

const authRouter=Router()
/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register",registerUserController)
authRouter.post("/login",loginUserController)

authRouter.get("/logout",logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description To get the user-details of the logged-in users
 * @access Private
 */
authRouter.get("/get-me",authMiddleware.authUser,getUserInfoController)

module.exports=authRouter