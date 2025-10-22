import express from "express"
import  isAuth  from "../middleware/isAuth.js"
// import upload, { update } from "../middleware/multer.js"
import upload from "../middleware/multer.js"
import { updateAssistant } from "../controllers/user.controller.js"
import { askToAssistant } from "../controllers/user.controller.js"
const useRouter=express.Router()
import { getCurrentUser } from "../controllers/user.controller.js"
useRouter.get("/current",isAuth,getCurrentUser)
useRouter.post("/update",isAuth,upload.single("assistantImage"),updateAssistant)
useRouter.post("/asktoassistant",isAuth,askToAssistant)
export default useRouter;