const User  = require('./user.model')

const users = new Map();

const getAll = async () => { 
  const userList = Array.from(users.values());
  return userList;
};

const getById = async (id) => {
  const user = users.get(id);
  return user;
}

const create = async (data) => {
  const user = new User(data);
  users.set(user.id, user);
  return user;
}

const update = async (userId, data) => {
  const user = users.get(userId);
  user.update(data);
  users.set(userId, user);
  return user;
}

const deleteUser = async(userId) => {
  const isDeleted = users.delete(userId);
  return isDeleted;
}

module.exports = { deleteUser, update, create, getById, getAll };
