import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

const app = express();
export default app;

dotenv.config({ path: '.env' });

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Importing routes
import authRoute from './routes/auth.js';
import uploadroute from './routes/upload.js';
app.use('/api/v1', authRoute);
app.use('/api/v1', uploadroute);
