import app from './app.js';
import { connectDB } from './config/db.js';

connectDB();

app.get('/', (req, res, next) => {
  res.send('<h1>Backend is Live</h1>');
});

app.listen(process.env.PORT, () =>
  console.log(`server running at ${process.env.PORT}`)
);
