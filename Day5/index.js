import process from 'node:process';
import express from 'express';
import mongoose from 'mongoose';
import {errorHandler} from './middlewares/errorHandler.js';
import employessRouter from './routes/employees.route.js';
import leavesRouter from './routes/leaves.route.js';
import cors from 'cors';
import 'dotenv/config';
import {leaveModel} from './models/leaves.model.js'

const app = express();
app.use(cors());;
app.use(express.json());
app.use('/employees', employessRouter);
app.use('/leaves', leavesRouter);

app.use(errorHandler);
app.all('*',(req,res,next)=>{
  
 res.status(404).json('This Resource is not found');
})
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log();
  console.log('Server is running on port http://localhost:3000');
});

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.error('Could not connect to MongoDB', err));

