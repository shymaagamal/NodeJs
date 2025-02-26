import express from 'express';
import {UsersController} from '../controllers/index.js';
import {asyncWrapper} from '../helpers.js';

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const router = express.Router();

router.post('/', async (req, res, next) => {
  const [err, data] = await asyncWrapper(UsersController.create(req.body));

  if (!err) return res.json(data);

  next(new CustomError(err.message, 422));
});

router.get('/', async (req, res) => {
  const users = await UsersController.getAll();
  res.json(users);
});

export default router;
