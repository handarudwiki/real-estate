import express from 'express';
import { login, logout, register } from '../controller/authController.js';
import { verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', verifyToken,logout)

export default router