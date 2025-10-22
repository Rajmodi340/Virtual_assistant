import express from "express"
import { SignUp,Login,Logout } from "../controllers/auth.js"
const authRouter=express.Router()
authRouter.post("/signup",SignUp)
authRouter.post("/signin",Login)
authRouter.get("/logout",Logout)
export default authRouter;
