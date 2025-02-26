import process from 'node:process';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/os45');
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
  process.exit(1);
});

app.use(express.json());

app.use(router);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
