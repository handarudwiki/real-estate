import express from 'express';
import { getAllUsers, getNotificatons, getUser, pofilePost, savePost, update } from '../controller/userController.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get('/', verifyToken,getUser)
router.put('/', verifyToken,update)
router.get('/all',getAllUsers)
router.get("/profile", verifyToken, pofilePost)
router.get("/notif", verifyToken, getNotificatons)
router.post("/save", verifyToken, savePost)

export default router