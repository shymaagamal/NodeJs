import Users from '../models/users.js';

const create = async (data) => {
  // validation
  const user = await Users.create(data);

  return user;
};

const getAll = async () => {
  const users = await Users
    .find({name: 'ITI OS 45'}, {name: 1, dob: 1})
    .exec();

  return users;
};

export {
  create,
  getAll
};
