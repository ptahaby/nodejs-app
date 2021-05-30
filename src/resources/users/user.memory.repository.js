const User  = require('./user.model')

/**
 * @const {Map<string, User>}
 */
const users = new Map();

/**
 * Get all users
 * @returns {Promise<Array<User>>} users
 */
const getAll = async () => { 
  const userList = Array.from(users.values());
  return userList;
};

/**
 * Get user by id
 * @param {string} id first term
 * @returns {Promise<User>} user
 */
const getById = async (id) => {
  const user = users.get(id);
  return user;
}

/**
 * Create user
 * @param {{name: string, login: string, password: string}} data first term
 * @returns {Promise<User>} user
 */
const create = async (data) => {
  const user = new User(data);
  users.set(user.id, user);
  return user;
}

/**
 * Update the user
 * @param {string} userId first term
 * @param {{name: string, login: string, password: string}} data second term
 * @returns {Promise<User>} user
 */
const update = async (userId, data) => {
  const user = users.get(userId);
  user.update(data);
  users.set(userId, user);
  return user;
}

/**
 * Delete the user
 * @param {string} userId first term
 * @returns {Promise<boolean>} boolean
 */
const deleteUser = async(userId) => {
  const isDeleted = users.delete(userId);
  return isDeleted;
}

module.exports = { deleteUser, update, create, getById, getAll };
