import express from 'express';
import {employeesRouter} from './routes/employees.js';

const app = express();

app.use('/employees', employeesRouter);
app.use(express.static('public'));
app.use(express.json());

app.set('views', 'views');
app.set('view engine', 'pug');

app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
