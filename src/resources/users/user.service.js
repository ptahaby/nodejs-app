const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

/**
 * Get all users
 * @returns {Promise<Array<User>>} users
 */
const getAll = () => usersRepo.getAll();

/**
 * Get user by id
 * @param {string} userId first term
 * @returns {Promise<User>}  user
 */
const getById = (userId) => usersRepo.getById(userId);

/**
 * Create user
 * @param {{name: string, login: string, password: string}} user first term
 * @returns {Promise<User>} user
 */
const create = (user) => usersRepo.create(user);

/**
 * Update user
 * @param {string} userId first term
 * @param {{name: string, login: string, password: string}} user second term
 * @returns {Promise<User>} user
 */
const update = (userId, user) => usersRepo.update(userId, user);

/**
 * Delete user
 * @param {string} userId first term
 * @returns {Promise<boolean>} boolean
 */
const deleteUser = (userId) => {
  taskService.clearUserIdTasks(userId);
  return usersRepo.deleteUser(userId);
}

module.exports = {  deleteUser, update, create, getById, getAll };
