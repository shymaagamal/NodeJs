import express from 'express';
import TodosRouter from './todos.js';
import UsersRouter from './users.js';

const router = express.Router();

router.use('/users', UsersRouter);
router.use('/todos', TodosRouter);

export default router;
