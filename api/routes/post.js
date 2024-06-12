import express from "express"
import { verifyToken } from "../middleware/verifytoken.js"
import { addPost, getAllPost, getPost } from "../controller/postController.js"

const router = express.Router()

router.get("/", verifyToken, getAllPost)
router.get("/:id", verifyToken, getPost)
router.post("/",verifyToken,addPost)


export default router