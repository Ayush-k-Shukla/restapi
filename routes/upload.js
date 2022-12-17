import express from 'express';
import { uploadfile } from '../controllers/upload.js';

const router = express();

router.post('/upload', uploadfile);

export default router;
