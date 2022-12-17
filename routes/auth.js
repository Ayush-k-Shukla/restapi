import express from 'express';
import { signIn, signUp, verifyToken } from '../controllers/auth.js';

const router = express();

router.post('/login', signIn);
router.post('/register', signUp);
router.post('/verifytoken', verifyToken);

export default router;
