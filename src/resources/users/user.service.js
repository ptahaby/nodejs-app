const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = (userId) => usersRepo.getById(userId);
const create = (user) => usersRepo.create(user);
const update = (userId, user) => usersRepo.update(userId, user);
const deleteUser = (userId) => usersRepo.deleteUser(userId);

module.exports = {  deleteUser, update, create, getById, getAll };
