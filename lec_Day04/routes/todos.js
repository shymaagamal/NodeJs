import express from 'express';
import {TodosController} from '../controllers/index.js';
import {asyncWrapper} from '../helpers.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const [err, todo] = await asyncWrapper(TodosController.create(req.body));

  if (err) return res.status(422).json({error: err.message});

  res.json(todo);
});

router.get('/', async (req, res) => {
  const todos = await TodosController.getAll();
  res.json(todos);
});

export default router;
