import { Router } from "express";
import { loggedInUserDetail, userLogin, userLogout, userRegisteration } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";


const userRouter = Router();

userRouter.route('/register').post(userRegisteration)
userRouter.route('/login').post(userLogin)
userRouter.route('/logout').get(userLogout)
userRouter.route('/get-user').get(verifyToken, loggedInUserDetail)


export { userRouter }