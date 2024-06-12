import express from "express"
import { verifyToken } from "../middleware/verifytoken.js"
import { addChat, getAllChats, getChat, readChat } from "../controller/chatController.js"

const router = express.Router()

router.get("/", verifyToken, getAllChats)
router.get("/:id", verifyToken, getChat)
router.post("/", verifyToken, addChat)
router.put("/:id",verifyToken, readChat)


export default router