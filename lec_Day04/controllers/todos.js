import Todos from '../models/todos.js';

const create = async (data) => {
  // validation
  const todos = await Todos.create(data);
  return todos;
};

const getAll = async () => {
  const todos = await Todos.find({}).populate('userId').exec();
  return todos;
};

export {
  create,
  getAll
};
